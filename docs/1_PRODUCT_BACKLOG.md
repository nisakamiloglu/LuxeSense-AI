# LuxeSense AI - Product Backlog

**Project:** LuxeSense AI - Luxury Fashion Shopping App
**Product Owner:** Nisa Kamiloglu
**Created:** March 10, 2026
**Last Updated:** March 10, 2026

---

## Product Vision
A premium luxury shopping mobile application with AI-powered personal styling, featuring multi-brand catalog, customer management, and sales advisor tools.

---

## Product Backlog Items

### Epic 1: User Authentication & Authorization

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-101 | As a user, I want to register with email/password so that I can create an account | High | 5 | To Do |
| US-102 | As a user, I want to login securely so that I can access my account | High | 3 | To Do |
| US-103 | As a user, I want to reset my password so that I can recover my account | Medium | 3 | To Do |
| US-104 | As a user, I want to stay logged in so that I don't have to login every time | Medium | 2 | To Do |
| US-105 | As an admin, I want to manage user roles so that I can control access | Low | 5 | To Do |

### Epic 2: Product Catalog & Management

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-201 | As a user, I want to view all products so that I can browse the catalog | High | 5 | Done |
| US-202 | As a user, I want to filter products by brand so that I can find specific items | High | 3 | Done |
| US-203 | As a user, I want to filter products by category so that I can narrow my search | High | 3 | Done |
| US-204 | As a user, I want to search products by name so that I can find items quickly | High | 3 | Done |
| US-205 | As a user, I want to view product details so that I can make informed decisions | High | 5 | Done |
| US-206 | As an admin, I want to add new products via API so that I can expand the catalog | Medium | 5 | To Do |
| US-207 | As an admin, I want to update product stock so that inventory is accurate | Medium | 3 | To Do |
| US-208 | As a user, I want to see real-time stock availability so that I know what's available | Medium | 3 | To Do |

### Epic 3: Shopping Cart & Checkout

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-301 | As a user, I want to add products to cart so that I can purchase later | High | 3 | Done |
| US-302 | As a user, I want to update cart quantities so that I can adjust my order | High | 2 | Done |
| US-303 | As a user, I want to remove items from cart so that I can change my mind | High | 2 | Done |
| US-304 | As a user, I want to see cart total so that I know the cost | High | 2 | Done |
| US-305 | As a user, I want to checkout with shipping info so that I can receive my order | High | 5 | Done |
| US-306 | As a user, I want to pay securely so that my payment info is safe | High | 8 | To Do |
| US-307 | As a user, I want to receive order confirmation so that I know my order is placed | Medium | 3 | Done |
| US-308 | As a user, I want my cart to persist so that I don't lose items | Medium | 3 | To Do |

### Epic 4: User Profile & Wishlist

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-401 | As a user, I want to view my profile so that I can see my information | High | 3 | Done |
| US-402 | As a user, I want to add items to wishlist so that I can save them for later | High | 3 | Done |
| US-403 | As a user, I want to view my order history so that I can track purchases | Medium | 3 | Done |
| US-404 | As a user, I want to update my profile so that my info is current | Medium | 3 | To Do |
| US-405 | As a user, I want my wishlist to persist so that I don't lose saved items | Medium | 3 | To Do |

### Epic 5: AI Stylist & Recommendations

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-501 | As a user, I want to chat with AI stylist so that I can get style advice | High | 8 | Done |
| US-502 | As a user, I want personalized recommendations so that I discover relevant products | Medium | 5 | To Do |
| US-503 | As a user, I want chat history to persist so that I can continue conversations | Low | 3 | To Do |

### Epic 6: Sales Advisor Dashboard

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-601 | As an advisor, I want to view my dashboard so that I can see my performance | High | 5 | Done |
| US-602 | As an advisor, I want to see assigned customers so that I can manage relationships | High | 5 | Done |
| US-603 | As an advisor, I want to view customer details so that I can provide personalized service | High | 3 | Done |
| US-604 | As an advisor, I want to chat with customers so that I can assist them | Medium | 5 | Done |
| US-605 | As an advisor, I want to track my sales targets so that I know my progress | Medium | 3 | Done |

### Epic 7: Backend API Development

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-701 | As a developer, I want a REST API for products so that the app can fetch data | High | 8 | To Do |
| US-702 | As a developer, I want a REST API for users so that authentication works | High | 8 | To Do |
| US-703 | As a developer, I want a REST API for orders so that purchases are saved | High | 8 | To Do |
| US-704 | As a developer, I want a REST API for cart so that cart data persists | Medium | 5 | To Do |
| US-705 | As a developer, I want API documentation so that the team can integrate easily | Medium | 3 | To Do |

### Epic 8: Database Design & Implementation

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-801 | As a developer, I want a users table so that user data is stored | High | 3 | To Do |
| US-802 | As a developer, I want a products table so that product data is stored | High | 3 | To Do |
| US-803 | As a developer, I want an orders table so that order data is stored | High | 3 | To Do |
| US-804 | As a developer, I want a cart table so that cart data persists | Medium | 2 | To Do |
| US-805 | As a developer, I want database migrations so that schema changes are tracked | Medium | 3 | To Do |

### Epic 9: Testing & Quality Assurance

| ID | User Story | Priority | Story Points | Status |
|----|------------|----------|--------------|--------|
| US-901 | As a developer, I want unit tests for API endpoints so that code quality is ensured | High | 8 | To Do |
| US-902 | As a developer, I want integration tests so that components work together | High | 5 | To Do |
| US-903 | As a tester, I want UI tests so that user flows work correctly | Medium | 5 | To Do |
| US-904 | As a developer, I want test coverage reports so that I know test completeness | Medium | 2 | To Do |
| US-905 | As a tester, I want performance tests so that the app is responsive | Low | 3 | To Do |

---

## Priority Legend
- **High:** Must have for MVP
- **Medium:** Should have for complete experience
- **Low:** Nice to have, can be deferred

## Story Points (Fibonacci)
- 1: Trivial task (< 1 hour)
- 2: Simple task (1-2 hours)
- 3: Small task (half day)
- 5: Medium task (1 day)
- 8: Large task (2-3 days)
- 13: Very large task (1 week) - should be broken down

---

## Backlog Summary

| Epic | Total Stories | To Do | In Progress | Done | Total Points |
|------|---------------|-------|-------------|------|--------------|
| Authentication | 5 | 5 | 0 | 0 | 18 |
| Product Catalog | 8 | 3 | 0 | 5 | 30 |
| Cart & Checkout | 8 | 2 | 0 | 6 | 28 |
| Profile & Wishlist | 5 | 2 | 0 | 3 | 15 |
| AI Stylist | 3 | 2 | 0 | 1 | 16 |
| Advisor Dashboard | 5 | 0 | 0 | 5 | 21 |
| Backend API | 5 | 5 | 0 | 0 | 32 |
| Database | 5 | 5 | 0 | 0 | 14 |
| Testing | 5 | 5 | 0 | 0 | 23 |
| **TOTAL** | **49** | **29** | **0** | **20** | **197** |

---

*Document Version: 1.0*
