import { inject } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';

export function createApollo() {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({
      uri: environment.graphqlUrl
    }),
    cache: new InMemoryCache()
  };
}