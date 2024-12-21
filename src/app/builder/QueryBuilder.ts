import { FilterQuery, Query, Document } from 'mongoose';

interface QueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  [key: string]: any; // Allow any additional query params for filtering
}

class QueryBuilder<T extends Document> {
  public modelQuery: Query<T[], T>;
  public query: QueryParams;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality: Searches over specified fields
  search(searchableFields: string[]) {
    const search = this.query.search;
    if (search) {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
      this.modelQuery = this.modelQuery.find({ $or: searchConditions });
    }

    return this;
  }

  // Filter functionality: Applies additional filters (e.g., author=authorId)
  filter() {
    const queryObj: Record<string, any> = { ...this.query }; // copy

    // Filtering: Exclude special query parameters like search, sort, limit, etc.
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (Object.keys(queryObj).length > 0) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  // Sorting functionality: Sorts the results based on sortBy and sortOrder
  sort() {
    const sortBy = this.query.sortBy || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });

    return this;
  }
}

export default QueryBuilder;
