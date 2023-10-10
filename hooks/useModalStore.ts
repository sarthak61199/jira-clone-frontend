import { create } from "zustand";

interface IssueList {
  id: number;
  title: string;
  description: string;
  progressId: number;
  priorityId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: {
    id: number;
    label: string;
  };
  progress: {
    id: number;
    label: string;
  };
  user: {
    id: number;
    name: string;
  };
}

export type ModalType =
  | "login"
  | "register"
  | "createIssue"
  | "editIssue"
  | "confirmDeleteUser"
  | "filterSidebar";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: IssueList | null;
  onOpen: (type: ModalType, data?: IssueList) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
