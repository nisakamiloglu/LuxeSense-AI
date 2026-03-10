# LuxeSense AI - Sprint 1 Backlog

**Sprint Number:** 1
**Sprint Duration:** 10 days (March 10 - March 19, 2026)
**Sprint Goal:** Establish backend infrastructure, database, and core API endpoints

---

## Sprint Planning

### Team Capacity
- **Team Size:** 1 developer (can be extended to team)
- **Working Days:** 10 days
- **Hours per Day:** 6 hours
- **Total Capacity:** 60 hours (~20 story points)

### Sprint Goal
> "By the end of Sprint 1, we will have a functional backend with database, user authentication API, and product API that can replace the current mock data."

---

## Selected User Stories (from Product Backlog)

### Backend Infrastructure (Day 1-2)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| T-001 | Set up Node.js + Express project structure | Developer | 2 | To Do |
| T-002 | Configure environment variables (.env) | Developer | 1 | To Do |
| T-003 | Set up project folder structure (routes, controllers, models) | Developer | 2 | To Do |
| T-004 | Install and configure required packages (cors, bcrypt, jwt) | Developer | 1 | To Do |

### Database Setup (Day 2-3)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| US-801 | Create database schema design document | Developer | 2 | To Do |
| US-802 | Set up MongoDB/PostgreSQL connection | Developer | 2 | To Do |
| T-005 | Create Users collection/table | Developer | 2 | To Do |
| T-006 | Create Products collection/table | Developer | 2 | To Do |
| T-007 | Create Orders collection/table | Developer | 2 | To Do |
| T-008 | Seed database with initial product data | Developer | 3 | To Do |

### Authentication API (Day 4-5)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| US-101 | POST /api/auth/register - User registration | Developer | 3 | To Do |
| US-102 | POST /api/auth/login - User login with JWT | Developer | 3 | To Do |
| T-009 | Implement password hashing (bcrypt) | Developer | 2 | To Do |
| T-010 | Implement JWT token generation | Developer | 2 | To Do |
| T-011 | Create auth middleware for protected routes | Developer | 2 | To Do |

### Product API (Day 6-7)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| US-701 | GET /api/products - List all products | Developer | 2 | To Do |
| T-012 | GET /api/products/:id - Get single product | Developer | 2 | To Do |
| T-013 | GET /api/products?brand=X - Filter by brand | Developer | 2 | To Do |
| T-014 | GET /api/products?category=X - Filter by category | Developer | 2 | To Do |
| T-015 | GET /api/brands - List all brands | Developer | 1 | To Do |
| T-016 | GET /api/categories - List all categories | Developer | 1 | To Do |

### Frontend Integration (Day 8-9)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| T-017 | Create API service file in React Native | Developer | 2 | To Do |
| T-018 | Replace mock product data with API calls | Developer | 3 | To Do |
| T-019 | Implement login/register screens with API | Developer | 3 | To Do |
| T-020 | Add loading states and error handling | Developer | 2 | To Do |

### Testing & Documentation (Day 9-10)

| ID | Task | Assigned To | Story Points | Status |
|----|------|-------------|--------------|--------|
| US-901 | Write unit tests for auth endpoints | Developer | 3 | To Do |
| US-902 | Write unit tests for product endpoints | Developer | 2 | To Do |
| US-705 | Create API documentation (README) | Developer | 2 | To Do |
| T-021 | Test API with Postman/Insomnia | Developer | 1 | To Do |

---

## Daily Task Breakdown

### Day 1 (March 10)
- [x] Initialize Git repository
- [x] Push to GitHub
- [ ] Set up Node.js + Express backend project
- [ ] Configure project structure

### Day 2 (March 11)
- [ ] Set up database connection
- [ ] Design database schema
- [ ] Create User model

### Day 3 (March 12)
- [ ] Create Product model
- [ ] Create Order model
- [ ] Seed products to database

### Day 4 (March 13)
- [ ] Implement registration endpoint
- [ ] Implement password hashing
- [ ] Write registration tests

### Day 5 (March 14)
- [ ] Implement login endpoint
- [ ] Implement JWT generation
- [ ] Create auth middleware

### Day 6 (March 15)
- [ ] Implement GET /products endpoint
- [ ] Implement GET /products/:id
- [ ] Add filtering (brand, category)

### Day 7 (March 16)
- [ ] Implement brands endpoint
- [ ] Implement categories endpoint
- [ ] Write product API tests

### Day 8 (March 17)
- [ ] Create apiService.js in React Native
- [ ] Replace mock data with API calls

### Day 9 (March 18)
- [ ] Implement login/register UI integration
- [ ] Add loading states
- [ ] Error handling

### Day 10 (March 19)
- [ ] Final testing
- [ ] API documentation
- [ ] Sprint review preparation

---

## Sprint 1 Summary

| Metric | Value |
|--------|-------|
| **Total Story Points** | 52 |
| **User Stories** | 8 |
| **Tasks** | 21 |
| **Focus Areas** | Backend, Database, Auth, Product API |

---

## Definition of Done
- [ ] Code is written and committed
- [ ] Code is reviewed (self-review for solo dev)
- [ ] Unit tests pass
- [ ] API endpoints return expected responses
- [ ] Documentation is updated
- [ ] No critical bugs

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Database connection issues | High | Use local SQLite as fallback |
| JWT implementation complexity | Medium | Use established libraries (jsonwebtoken) |
| Time constraints | High | Prioritize core features, defer nice-to-haves |

---

## Stand-up Meeting Schedule
- **Day 1:** Kickoff meeting
- **Day 3:** Progress check
- **Day 5:** Mid-sprint review
- **Day 7:** Progress check
- **Day 10:** Sprint review

---

*Document Version: 1.0*
