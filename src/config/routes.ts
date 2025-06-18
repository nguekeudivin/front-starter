export const routes = {
  home: "/",
  auth: {
    home: "/",
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
};

export const authRoutes = ["/auth/login", "/auth/register"];

export const privateRoutes = [
  "/account",
];

export const allRoutes = [...authRoutes, privateRoutes]