# CookSpace Project Progress & Flow

## Overview
CookSpace is a full-stack recipe discovery and management web application built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It allows users to browse pre-defined database recipes, register securely, add their own custom recipes natively to the cloud, watch recipe videos, and securely bookmark their favorite dishes behind authentication.

**Mongo Atlas Deployment:** The production database system leverages MongoDB Atlas which internally supports:
- **Replica Sets** for high availability and redundancy.
- **Sharding** for horizontal scalability in predictably large datasets.

## Advanced Querying & Database Optimizations (Syllabus Integration)

### Advanced Querying
The backend dynamically builds precise `Mongoose` queries mapping directly to powerful MongoDB native evaluators:
- `$in` logic for intelligently filtering recipes by multiple array strings (`tags`).
- `$and` pipelines for intelligently combining search-bars, cooking time, and concurrent category filters together.
- `$regex` mappings for highly flexible, case-insensitive string searching.

**Practical Query Example Executed via API:**
```javascript
Recipe.find({
  $and: [
    { cookingTime: { $lte: 30 } },
    { tags: { $in: ["Indian", "Quick"] } }
  ]
})
```

### Pagination & Sorting Execution
The central Explore API implements robust algorithmic pagination by mathematically chaining MongoDB’s natively optimized memory methods specifically `limit()` and `skip()` directly into the search pipeline alongside dynamic `sort()` functionality.

### Projection Configurations
To effectively optimize network overhead and JSON response times, strong Mongoose projection scopes are executed to securely fetch solely the critical fields:
```javascript
Recipe.find({}, { name: 1, cookingTime: 1, image: 1, description: 1 })
```

### Aggregation Framework Output
Deep Aggregation pipelines natively map statistical reductions without draining client threads:
- Compute and isolate the most popular tags across the database (`$group`)
- Calculate baseline global numerical summaries like average cooking time metrics (`$avg`)
- Systematically rank recipes natively by total stored bookmarks (`$sort`)

### Database Indexing Strategy
Mathematical indexes are deliberately defined natively inside the schema to guarantee logarithmic query evaluation during mass traffic events:
- `name` (text search optimization for direct queries)
- `{ tags: 1, cookingTime: 1 }` (Highly specific Compound Index applied strictly for filtered tag/time lookups)

### Expected Basic MongoDB Shell Operations
Demonstrable replica Mongo shell commands summarizing CRUD executions running behind the Express API:
```shell
db.recipes.find()
db.recipes.findOne({ _id: ObjectId("...") })
db.recipes.updateOne({ _id: ObjectId("...") }, { $push: { bookmarks: "user_req_id" } })
db.recipes.deleteOne({ _id: ObjectId("...") })
```

---

## Architectural Progress & Flow Components

1. **Routing and Navigation Structure**
   The application intelligently utilizes `react-router-dom` to govern UI workflows. It is tightly tethered to robust `AuthProvider` logic allowing strict context-aware **Private Routes** restricting features conditionally.

2. **Integration into the Backend (Home & Explore)**
   Sweeping monolithic `localStorage` logic has been securely stripped and completely replaced with asynchronous REST interfaces natively streaming off the `Node.js` environment to consume `GET /api/recipes` seamlessly.

3. **Authentication & Identity Suite**
   - Implemented absolute stateless security measures mapping JSON payload footprints utilizing highly encrypted **JSON Web Tokens (JWT)**.
   - Credentials interface strictly with a standardized **Bcrypt** hashed pipeline securely blocking raw-text inserts natively via Mongoose `pre(save)` hooks.

4. **Add Recipe Generator**
   - End-users can intuitively push multi-part arrays actively to the central MongoDB container via normalized schemas natively. 
   - Uses `Base64` encoders running on scaled 50MB `express.json` payload environments precisely formatting embedded schemas containing NoSQL Array clusters for ingredients and complex strings seamlessly formatting to `POST`.

5. **Metadata Mutations & Document Controls**
   - Integrates explicit Bookmark triggers running `api.post('/users/bookmark/:id')`. Deep execution leverages MongoDB's completely atomic operations `($push / $pull)` cleanly interacting sequentially alongside global `$inc` triggers managing public counts seamlessly!
