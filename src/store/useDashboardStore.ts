import { create } from 'zustand';

interface DashboardState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  pageTitle: "Overview",
  setPageTitle: (title) => set({ pageTitle: title }),
}));