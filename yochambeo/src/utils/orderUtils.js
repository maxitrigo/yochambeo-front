export const sortJobsByDate = (jobs) => {
    return jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

export const sortJobsBySalary = (jobs) => {
    return jobs.sort((a, b) => b.salary - a.salary);
  };
