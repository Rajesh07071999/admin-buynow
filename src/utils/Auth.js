export const isAuthenticated = () => {
  return !!localStorage.getItem("adminToken"); 
};
