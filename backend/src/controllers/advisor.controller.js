const Order = require('../models/Order');
const User = require('../models/User');

exports.getPerformance = async (req, res, next) => {
  try {
    const advisor = await User.findById(req.user.id);
    if (advisor.role !== 'advisor') {
      return res.status(403).json({ success: false, message: 'Not an advisor' });
    }

    const customerIds = advisor.assignedCustomerIds || [];
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [monthOrders, weekOrders] = await Promise.all([
      Order.find({ userId: { $in: customerIds }, createdAt: { $gte: startOfMonth } }),
      Order.find({ userId: { $in: customerIds }, createdAt: { $gte: startOfWeek } }),
    ]);

    const currentSalesRaw = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const monthlyTarget = 500000;
    const percentComplete = Math.min(Math.round((currentSalesRaw / monthlyTarget) * 100), 100);
    const daysRemaining = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
    const avgTicket = monthOrders.length > 0 ? Math.round(currentSalesRaw / monthOrders.length) : 0;

    // Weekly trend (Mon–Sun)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekMap = {};
    dayNames.forEach(d => { weekMap[d] = 0; });
    weekOrders.forEach(o => {
      const day = dayNames[new Date(o.createdAt).getDay()];
      weekMap[day] += o.total || 0;
    });
    const weeklyTrend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => ({
      day: d,
      sales: weekMap[d],
    }));

    // Sales by category (from order items)
    const catTotals = {};
    monthOrders.forEach(o => {
      (o.items || []).forEach(item => {
        const cat = item.category || 'Other';
        catTotals[cat] = (catTotals[cat] || 0) + (item.price * item.quantity);
      });
    });
    const totalCatSales = Object.values(catTotals).reduce((a, b) => a + b, 0) || 1;
    const salesByCategory = Object.entries(catTotals).map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount: `$${amount.toLocaleString()}`,
      percentage: Math.round((amount / totalCatSales) * 100),
    }));

    res.json({
      success: true,
      performanceMetrics: {
        currentSales: `$${currentSalesRaw.toLocaleString()}`,
        monthlyTarget: `$${monthlyTarget.toLocaleString()}`,
        percentComplete,
        daysRemaining,
        averageTicket: `$${avgTicket.toLocaleString()}`,
        totalClients: customerIds.length,
        repeatClients: monthOrders.filter((o, _, arr) =>
          arr.filter(x => x.userId.toString() === o.userId.toString()).length > 1
        ).length,
      },
      weeklyTrend,
      salesByCategory: salesByCategory.length > 0 ? salesByCategory : [
        { category: 'Bags', amount: '$0', percentage: 0 },
      ],
    });
  } catch (error) {
    next(error);
  }
};
