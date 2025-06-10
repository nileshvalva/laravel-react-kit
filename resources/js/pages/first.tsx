// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/dashboard',
  },
];

type User = {
  id: number;
  name: string;
  email: string;
};

type DemoProps = {
  users: User[];
};

export default function Demo({ users }: DemoProps) {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Users" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user.id} className="p-4 shadow rounded">
                  <p><strong>{user.name}</strong></p>
                  <p className="text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
