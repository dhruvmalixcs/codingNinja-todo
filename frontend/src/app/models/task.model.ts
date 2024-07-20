export interface Task {
    _id?: string;
    title: string;
    desc: string;
    dueDate: Date;
    listId: string;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'done';
    completed?: boolean;
  }