import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private graphqlUrl = 'https://comp3133-101508691-assignment1.onrender.com';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
  const body = {
    query: `
      query Login($input: LoginInput!) {
        login(input: $input) {
          success
          message
          token
          user {
            username
          }
        }
      }
    `,
    variables: {
      input: { usernameOrEmail, password }
    }
  };

  return this.http.post<any>(this.graphqlUrl, body).pipe(
    map((res) => {
      const data = res.data.login;
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.success && data.user?.username) {
        localStorage.setItem('username', data.user.username);
      }
      return data;
    })
  );
}

  signup(username: string, email: string, password: string): Observable<any> {
  const body = {
    query: `
      mutation Signup($input: SignupInput!) {
        signup(input: $input) {
          success
          message
          token
          user {
            username
          }
        }
      }
    `,
    variables: {
      input: { username, email, password }
    }
  };

  return this.http.post<any>(this.graphqlUrl, body).pipe(
    map((res) => {
      const data = res.data.signup;
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.success && data.user?.username) {
        localStorage.setItem('username', data.user.username);
      }
      return data;
    })
  );
}

  getUsername(): string {
  return localStorage.getItem('username') || '';
}
  getAllEmployees(): Observable<any[]> {
    const body = {
      query: `
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.getAllEmployees || [])
    );
  }

  searchEmployees(term: string): Observable<any[]> {
    const body = {
      query: `
        query SearchEmployee($term: String!) {
          searchEmployeeByDesignationOrDepartment(term: $term) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        term
      }
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.searchEmployeeByDesignationOrDepartment || [])
    );
  }

  getEmployeeById(id: string): Observable<any> {
    const body = {
      query: `
        query GetEmployeeById($id: ID!) {
          searchEmployeeById(id: $id) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: {
        id
      }
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.searchEmployeeById)
    );
  }

  addEmployee(input: any): Observable<any> {
    const body = {
      query: `
        mutation AddEmployee($input: AddEmployeeInput!) {
          addEmployee(input: $input) {
            success
            message
            employee {
              _id
              first_name
              last_name
            }
          }
        }
      `,
      variables: {
        input
      }
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.addEmployee)
    );
  }

  updateEmployee(id: string, input: any): Observable<any> {
    const body = {
      query: `
        mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
          updateEmployeeById(id: $id, input: $input) {
            success
            message
            employee {
              _id
              first_name
              last_name
            }
          }
        }
      `,
      variables: {
        id,
        input
      }
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.updateEmployeeById)
    );
  }

  deleteEmployee(id: string): Observable<any> {
    const body = {
      query: `
        mutation DeleteEmployee($id: ID!) {
          deleteEmployeeById(id: $id) {
            success
            message
          }
        }
      `,
      variables: {
        id
      }
    };

    return this.http.post<any>(this.graphqlUrl, body, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => res.data?.deleteEmployeeById)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  localStorage.removeItem('username');
  }
}