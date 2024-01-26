import { TLiquidAssets, TMonthlyExpenses, User } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  registerFetch: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Registering a new user failed");
      }
      return response.json();
    });
  },

  fetchAllDataAtEndpoint: (endpoint: string) => {
    return fetch(`${baseUrl}/${endpoint}`, { method: "GET" }).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      }
    );
  },

  formatUserBarChartData: (user: User) => {
    const labels: string[] = [];
    const values: string[] = [];
    const color: string[] = [];
    const userDataId: string[] = [];

    return Requests.fetchAllDataAtEndpoint("Liquid Assets")
      .then((data) =>
        data.filter((userData: TLiquidAssets) => userData.userId === user.id)
      )
      .then((filteredData) => {
        for (let i = 0; i < filteredData.length; i++) {
          labels.push(filteredData[i].label);
          values.push(filteredData[i].value);
          color.push(filteredData[i].color);
          userDataId.push(filteredData[i].id);
        }
        const dataObj = {
          userDataId,
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: color,
              hoverBackgroundColor: color,
            },
          ],
        };
        return dataObj;
      });
  },

  createBarChart: (
    userId: string,
    value: string,
    label: string,
    color: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/Liquid Assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value,
        label,
        color,
        userId,
      }),
    }).then((response) => {
      if (!response.ok) throw new Error("Error Fetching Bar Chart");
      return response.json();
    });
  },

  patchBarChart: (
    id: string,
    value: string,
    label: string,
    color: string,
    userId: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/Liquid Assets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value, label, color, userId }),
    }).then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
  },

  deleteBarChart: (id: string): Promise<unknown> => {
    return fetch(`${baseUrl}/Liquid Assets/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      }
    );
  },

  postReview: (
    value: number,
    comment: string,
    userId: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value, comment, userId }),
    }).then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
  },

  formatUserDoughnutChartData: (user: User) => {
    const labels: string[] = [];
    const values: string[] = [];
    const color: string[] = [];
    const userDataId: string[] = [];

    return Requests.fetchAllDataAtEndpoint("Monthly Expenses")
      .then((data) =>
        data.filter((userData: TMonthlyExpenses) => userData.userId === user.id)
      )
      .then((filteredData) => {
        for (let i = 0; i < filteredData.length; i++) {
          labels.push(filteredData[i].label);
          values.push(filteredData[i].value);
          color.push(filteredData[i].color);
          userDataId.push(filteredData[i].id);
        }
        const dataObj = {
          userDataId,
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: color,
              hoverBackgroundColor: color,
            },
          ],
        };
        return dataObj;
      });
  },

  createMonthlyExpense: (
    userId: string,
    value: string,
    label: string,
    color: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/Monthly Expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value,
        label,
        color,
        userId,
      }),
    }).then((response) => {
      if (!response.ok) throw new Error("Error Fetching Bar Chart");
      return response.json();
    });
  },

  patchDoughnutChart: (
    id: string,
    value: string,
    label: string,
    color: string,
    userId: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/Monthly Expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value, label, color, userId }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    });
  },

  deleteDoughnutChart: (id: string): Promise<unknown> => {
    return fetch(`${baseUrl}/Monthly Expenses/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
  },

  deleteCheckListItem: (id: string): Promise<unknown> => {
    return fetch(`${baseUrl}/checklist/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      }
    );
  },

  AddCheckListItem: (
    name: string,
    price: string,
    userId: string
  ): Promise<unknown> => {
    return fetch(`${baseUrl}/checklist/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        userId,
      }),
    }).then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
  },
};
