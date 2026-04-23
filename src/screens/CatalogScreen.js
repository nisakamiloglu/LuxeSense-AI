import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { brands, priceRanges } from '../constants/mockData';

const { width } = Dimensions.get('window');
const CARD_W = (width - 20 * 2 - 12) / 2;

const WOMEN_CHIPS = [
  { id: 'all', label: 'All', categories: ['clothing', 'bags', 'jewelry', 'accessories'] },
  { id: 'tops', label: 'Tops', categories: ['clothing'] },
  { id: 'bottoms', label: 'Bottoms', categories: ['clothing'] },
  { id: 'dresses', label: 'Dresses', categories: ['clothing'] },
  { id: 'bags', label: 'Bags', categories: ['bags'] },
  { id: 'jewelry', label: 'Jewelry', categories: ['jewelry'] },
  { id: 'accessories', label: 'Accessories', categories: ['accessories'] },
];

const MEN_CHIPS = [
  { id: 'all', label: 'All', categories: ['clothing', 'watches', 'accessories'] },
  { id: 'jackets', label: 'Jackets', categories: ['clothing'] },
  { id: 'shirts', label: 'Shirts', categories: ['clothing'] },
  { id: 'trousers', label: 'Trousers', categories: ['clothing'] },
  { id: 'watches', label: 'Watches', categories: ['watches'] },
  { id: 'accessories', label: 'Accessories', categories: ['accessories'] },
];

const FILTER_TABS = [
  { id: 'all', label: 'Everything' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'bags', label: 'Bags' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'watches', label: 'Watches' },
  { id: 'accessories', label: 'Accessories' },
];

const getCategoryName = (id) => {
  const map = { clothing: 'Clothing', bags: 'Bags', jewelry: 'Fine Jewelry', watches: 'Watches', accessories: 'Accessories' };
  return map[id] || id;
};

const CatalogScreen = ({ navigation, route }) => {
  const { toggleWishlist, isInWishlist, getCartCount, products } = useApp();
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState(() => route?.params?.selectedCategory || 'all');
  const [activeBrand, setActiveBrand] = useState(() => route?.params?.selectedBrand || 'all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedGender, setSelectedGender] = useState(null); // 'women' | 'men' | null
  const [activeFilterChip, setActiveFilterChip] = useState('all');
  const listRef = useRef(null);
  useScrollToTop(listRef);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.selectedBrand) {
        setActiveBrand(route.params.selectedBrand);
        setActiveCategory('all');
        setSelectedGender(null);
        navigation.setParams({ selectedBrand: undefined });
      } else if (route?.params?.selectedCategory) {
        setActiveCategory(route.params.selectedCategory);
        setActiveBrand('all');
        setSelectedGender(null);
        navigation.setParams({ selectedCategory: undefined });
      } else {
        // Apply saved gender preference if no gender is currently selected
        AsyncStorage.getItem('genderPreference').then((saved) => {
          if (saved && !selectedGender) setSelectedGender(saved);
        }).catch(() => {});
      }
    }, [route?.params?.selectedBrand, route?.params?.selectedCategory])
  );

  const selectGender = async (gender) => {
    try { await AsyncStorage.setItem('genderPreference', gender); } catch (_) {}
    setSelectedGender(gender);
    setActiveFilterChip('all');
  };

  const handleBack = () => {
    if (selectedGender) {
      setSelectedGender(null);
      setActiveFilterChip('all');
    } else {
      setActiveCategory('all');
      setActiveBrand('all');
      setSearchQuery('');
      setActivePriceRange('all');
      setSortBy('featured');
    }
  };

  const clearAllFilters = () => {
    setActiveBrand('all');
    setActivePriceRange('all');
    setSortBy('featured');
    setActiveCategory('all');
  };

  // Products for gender category page
  const currentChips = selectedGender === 'women' ? WOMEN_CHIPS : MEN_CHIPS;
  const activeChip = currentChips.find(c => c.id === activeFilterChip) || currentChips[0];
  const genderProducts = products.filter(p => activeChip.categories.includes(p.category));

  // Products for legacy product listing
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesBrand = activeBrand === 'all' || product.brand === activeBrand;
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const priceRange = priceRanges.find(r => r.id === activePriceRange);
    const matchesPrice = !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);
    return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const isExploreView = !selectedGender && activeCategory === 'all' && activeBrand === 'all' && !searchQuery;

  const getPageTitle = () => {
    if (activeBrand !== 'all') return brands.find(b => b.id === activeBrand)?.name || activeBrand;
    if (activeCategory !== 'all') return getCategoryName(activeCategory);
    return 'All Products';
  };

  const renderProductCard = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={[styles.productCard, { marginLeft: index % 2 === 0 ? 20 : 12 }]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        <Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.productImage}
          resizeMode="cover"
          fadeDuration={0}
        />
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => toggleWishlist(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isInWishlist(item.id) ? 'heart' : 'heart-outline'}
            size={16}
            color={isInWishlist(item.id) ? '#E53935' : '#1A1A1A'}
          />
        </TouchableOpacity>
        {item.onSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>SALE</Text>
          </View>
        )}
        {!item.onSale && item.id % 4 === 1 && (
          <View style={[styles.saleBadge, { backgroundColor: '#2E7D32' }]}>
            <Text style={styles.saleBadgeText}>NEW</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.brandLabel}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price.toLocaleString()}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice.toLocaleString()}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // ── EXPLORE VIEW ──────────────────────────────────────────
  if (isExploreView) {
    return (
      <View style={styles.container}>
        <View style={styles.exploreHeader}>
          <View style={{ flex: 1 }} />
          <Text style={styles.exploreTitle}>Explore</Text>
          <View style={styles.exploreHeaderRight}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
              <Ionicons name="heart-outline" size={22} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="bag-outline" size={22} color="#1A1A1A" />
              {getCartCount() > 0 && (
                <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{getCartCount()}</Text></View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.exploreContent}>
          {/* Women's Collection Card */}
          <TouchableOpacity
            style={styles.editorialCard}
            onPress={() => selectGender('women')}
            activeOpacity={0.92}
          >
            <Image source={require('../images/Banner/banner2.webp')} style={styles.editorialImg} resizeMode="cover" />
            <View style={styles.editorialOverlay} />
            <Text style={styles.editorialTitle}>Women's Collection</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={() => selectGender('women')}>
              <Text style={styles.shopBtnText}>Shop ›</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Men's Collection Card */}
          <TouchableOpacity
            style={styles.editorialCard}
            onPress={() => selectGender('men')}
            activeOpacity={0.92}
          >
            <Image source={require('../images/Banner/banner4.webp')} style={styles.editorialImg} resizeMode="cover" />
            <View style={[styles.editorialOverlay, { backgroundColor: 'rgba(0,0,0,0.52)' }]} />
            <Text style={styles.editorialTitle}>Men's Collection</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={() => selectGender('men')}>
              <Text style={styles.shopBtnText}>Shop ›</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    );
  }

  // ── GENDER CATEGORY VIEW ──────────────────────────────────
  if (selectedGender) {
    const isWomen = selectedGender === 'women';
    const heroImg = isWomen
      ? require('../images/Banner/banner2.webp')
      : require('../images/Banner/banner4.webp');
    const collectionTitle = isWomen ? "Women's Collection" : "Men's Collection";
    const sectionTitle = isWomen ? "Women's Clothing" : "Men's Clothing";

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.listHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
              <Ionicons name="heart-outline" size={22} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="bag-outline" size={22} color="#1A1A1A" />
              {getCartCount() > 0 && (
                <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{getCartCount()}</Text></View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image source={heroImg} style={styles.heroImg} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{collectionTitle}</Text>
            <Text style={styles.heroDesc}>Discover the finest selection</Text>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.categoryHeader}>
          <View>
            <Text style={styles.categoryTitle}>{sectionTitle}</Text>
            <Text style={styles.categoryCount}>{genderProducts.length} items found</Text>
          </View>
          <TouchableOpacity style={styles.filterIconBtn} onPress={() => setShowFilterModal(true)}>
            <Ionicons name="options-outline" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}
        >
          {currentChips.map(chip => (
            <TouchableOpacity
              key={chip.id}
              style={[styles.chip, activeFilterChip === chip.id && styles.chipActive]}
              onPress={() => setActiveFilterChip(chip.id)}
            >
              <Text style={[styles.chipText, activeFilterChip === chip.id && styles.chipTextActive]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <FlatList
          ref={listRef}
          data={genderProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={4}
          windowSize={5}
          removeClippedSubviews
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#C4C4C4" />
              <Text style={styles.emptyTitle}>{t('catalog.noProducts')}</Text>
            </View>
          }
        />

        {/* Filter Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent onRequestClose={() => setShowFilterModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('common.filter')}</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Ionicons name="close" size={22} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>{t('catalog.sortBy')}</Text>
                  <View style={styles.chipRow}>
                    {[
                      { id: 'featured', label: t('catalog.popular') },
                      { id: 'price_low', label: t('catalog.priceLowHigh') },
                      { id: 'price_high', label: t('catalog.priceHighLow') },
                      { id: 'name', label: 'Name' },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        style={[styles.filterChip, sortBy === option.id && styles.chipActive]}
                        onPress={() => setSortBy(option.id)}
                      >
                        <Text style={[styles.chipText, sortBy === option.id && styles.chipTextActive]}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={[styles.filterSection, { borderBottomWidth: 0 }]}>
                  <Text style={styles.filterSectionTitle}>{t('catalog.priceRange')}</Text>
                  <View style={styles.chipRow}>
                    {priceRanges.map((range) => (
                      <TouchableOpacity
                        key={range.id}
                        style={[styles.filterChip, activePriceRange === range.id && styles.chipActive]}
                        onPress={() => setActivePriceRange(range.id)}
                      >
                        <Text style={[styles.chipText, activePriceRange === range.id && styles.chipTextActive]}>{range.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.clearBtn} onPress={() => { setActivePriceRange('all'); setSortBy('featured'); }}>
                  <Text style={styles.clearBtnText}>{t('catalog.clearAll')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilterModal(false)}>
                  <Text style={styles.applyBtnText}>{t('catalog.showResults')} ({genderProducts.length})</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // ── PRODUCT LISTING VIEW (legacy — from HomeScreen brand/category navigation) ──
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setShowFilterModal(true)}>
            <Ionicons name="options-outline" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-outline" size={22} color="#1A1A1A" />
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{getCartCount()}</Text></View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabPill, activeCategory === tab.id && styles.tabPillActive]}
            onPress={() => setActiveCategory(tab.id)}
          >
            <Text style={[styles.tabText, activeCategory === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        ref={listRef}
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{getPageTitle()}</Text>
            <Text style={styles.sectionCount}>{filteredProducts.length} items found</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#C4C4C4" />
            <Text style={styles.emptyTitle}>{t('catalog.noProducts')}</Text>
            <TouchableOpacity style={styles.clearFiltersBtn} onPress={clearAllFilters}>
              <Text style={styles.clearFiltersBtnText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <Modal visible={showFilterModal} animationType="slide" transparent onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('common.filter')}</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={22} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>{t('catalog.sortBy')}</Text>
                <View style={styles.chipRow}>
                  {[
                    { id: 'featured', label: t('catalog.popular') },
                    { id: 'price_low', label: t('catalog.priceLowHigh') },
                    { id: 'price_high', label: t('catalog.priceHighLow') },
                    { id: 'name', label: 'Name' },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[styles.filterChip, sortBy === option.id && styles.chipActive]}
                      onPress={() => setSortBy(option.id)}
                    >
                      <Text style={[styles.chipText, sortBy === option.id && styles.chipTextActive]}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>{t('catalog.brand')}</Text>
                <View style={styles.chipRow}>
                  {brands.map((brand) => (
                    <TouchableOpacity
                      key={brand.id}
                      style={[styles.filterChip, activeBrand === brand.id && styles.chipActive]}
                      onPress={() => setActiveBrand(brand.id)}
                    >
                      <Text style={[styles.chipText, activeBrand === brand.id && styles.chipTextActive]}>{brand.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.filterSection, { borderBottomWidth: 0 }]}>
                <Text style={styles.filterSectionTitle}>{t('catalog.priceRange')}</Text>
                <View style={styles.chipRow}>
                  {priceRanges.map((range) => (
                    <TouchableOpacity
                      key={range.id}
                      style={[styles.filterChip, activePriceRange === range.id && styles.chipActive]}
                      onPress={() => setActivePriceRange(range.id)}
                    >
                      <Text style={[styles.chipText, activePriceRange === range.id && styles.chipTextActive]}>{range.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearAllFilters}>
                <Text style={styles.clearBtnText}>{t('catalog.clearAll')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.applyBtnText}>{t('catalog.showResults')} ({filteredProducts.length})</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // ── Explore Header ──────────────────────────────────────
  exploreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  exploreTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  exploreHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  exploreContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  // ── Editorial Cards ─────────────────────────────────────
  editorialCard: {
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  editorialImg: {
    width: '100%',
    height: '100%',
  },
  editorialOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  editorialTitle: {
    position: 'absolute',
    bottom: 52,
    left: 20,
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  shopBtn: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    paddingHorizontal: 22,
    paddingVertical: 9,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  shopBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // ── Gender Category Header ──────────────────────────────
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#1A1A1A',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },

  // ── Hero Banner ─────────────────────────────────────────
  heroBanner: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  heroImg: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  heroDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  heroDots: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    gap: 5,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  heroDotActive: {
    backgroundColor: '#fff',
    width: 16,
    borderRadius: 3,
  },

  // ── Category Section Header ─────────────────────────────
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  categoryCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  filterIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Filter Chips ────────────────────────────────────────
  chipsScroll: {
    maxHeight: 50,
    marginBottom: 4,
  },
  chipsContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
  },
  chipActive: { backgroundColor: '#1A1A1A' },
  chipText: { fontSize: 13, fontWeight: '500', color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 9, backgroundColor: '#F5F5F5', borderRadius: 28 },

  // ── Filter Tabs (legacy) ────────────────────────────────
  tabsContainer: {
    maxHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    alignItems: 'center',
  },
  tabPill: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 28,
    backgroundColor: '#F2F2F2',
  },
  tabPillActive: { backgroundColor: '#1A1A1A' },
  tabText: { fontSize: 14, fontWeight: '500', color: '#555' },
  tabTextActive: { color: '#fff', fontWeight: '600' },

  // ── Section Header ──────────────────────────────────────
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  sectionCount: { fontSize: 13, color: '#999', marginTop: 4 },

  // ── Product Grid ────────────────────────────────────────
  productsContainer: { paddingRight: 20, paddingBottom: 100 },
  productCard: { width: CARD_W, marginBottom: 24 },
  imageContainer: {
    width: '100%',
    height: CARD_W * 1.35,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  productImage: { width: '100%', height: '100%' },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  saleBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  productInfo: { marginTop: 10, paddingHorizontal: 2 },
  brandLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  productName: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  productPrice: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  originalPrice: { fontSize: 12, color: '#AAA', textDecorationLine: 'line-through' },

  // ── Empty State ─────────────────────────────────────────
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 17, fontWeight: '500', color: '#1A1A1A', marginTop: 16 },
  clearFiltersBtn: { marginTop: 20, paddingHorizontal: 28, paddingVertical: 14, backgroundColor: '#1A1A1A', borderRadius: 28 },
  clearFiltersBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },

  // ── Filter Modal ────────────────────────────────────────
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, height: '72%' },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  filterSection: { paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  filterSectionTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginBottom: 14, letterSpacing: 0.3 },
  modalFooter: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 34, gap: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  clearBtn: { flex: 1, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 28, borderWidth: 1.5, borderColor: '#1A1A1A' },
  clearBtnText: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  applyBtn: { flex: 2, height: 52, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 28 },
  applyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});

export default CatalogScreen;
