import { Query, Document, Types } from 'mongoose';
import { QueryParams } from './QueryInterface';


class QueryBuilder<T extends Document> {
  public modelQuery: Query<T[], T>;
  public query: QueryParams;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality: Searches over specified fields
  search(searchableFields: string[]) {
    const { search } = this.query;
    if (search) {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' }, // Case-insensitive search
      }));
      this.modelQuery = this.modelQuery.find({ $or: searchConditions });
    }
    return this;
  }

  // Filter functionality: Applies additional filters (e.g., author=authorId)
  filter() {
    const { filter } = this.query;

    if (filter) {
      try {
        const authorId = Types.ObjectId.createFromHexString(filter); // Convert filter to ObjectId
        this.modelQuery = this.modelQuery.find({ author: authorId });
      } catch (err) {
        console.error('Invalid ObjectId for filter:', filter);
      }
    }

    return this;
  }

  // Sorting functionality: Sorts the results based on sortBy and sortOrder
  sort() {
    const sortBy = this.query.sortBy || 'createdAt'; // Default sort field
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1; // Default to descending
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }


  build() {
    return this.modelQuery;
  }
}

export default QueryBuilder;
