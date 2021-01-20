import { Cache, QueryInput } from '@urql/exchange-graphcache';

export function myUpdateQuery<Result, Query>(
  cache: Cache,
  _result: any,
  queryInput: QueryInput,
  func: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (query) => func(_result, query as any) as any
  );
}
