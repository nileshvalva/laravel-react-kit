import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users/index',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
};

type UserProps = {
    users: User[],
    flash: {
        success?: string;
        error?: string;
        message?: string;
    };
};

export default function User({ users }: UserProps) {
    const { flash } = usePage().props
    // console.log(flash);
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            router.delete(`/users/${selectedUser.id}/delete`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                }
            });
        }
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="fixed top-6 right-6 z-50">
                {showSuccess && flash.success && (
                    <div className="bg-green-500 text-white px-6 py-4 rounded shadow-lg transition-all duration-300">
                        <strong className="block font-semibold mb-1">Success</strong>
                        <span>{flash.success}</span>
                    </div>
                )}
            </div>
            <div className="p-4 space-y-4">
                {/* {showSuccess && flash.success && (
                    <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )} */}

                <div className="flex justify-end">
                    <Link
                        href="/users/create"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
                    >
                        + Create User
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-left">
                            <tr>
                                <th className="px-4 py-3 border-b dark:border-gray-700">#</th>
                                <th className="px-4 py-3 border-b dark:border-gray-700">Name</th>
                                <th className="px-4 py-3 border-b dark:border-gray-700">Email</th>
                                <th className="px-4 py-3 border-b dark:border-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-800"
                                >
                                    <td className="px-4 py-2 border-b dark:border-gray-700">{index + 1}</td>
                                    <td className="px-4 py-2 border-b dark:border-gray-700">{user.name}</td>
                                    <td className="px-4 py-2 border-b dark:border-gray-700">{user.email}</td>
                                    <td className="px-4 py-2 border-b dark:border-gray-700">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="flex items-center gap-1"
                                            >
                                                <Pencil size={16} className="mr-1" />
                                                <Link href={`/users/${user.id}/edit`} className="inline-block">
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="flex items-center gap-1"
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                                <Trash2 size={16} className="mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <div className="flex flex-col items-center">
                            <Trash2 size={40} className="text-red-500 mb-2" />
                            <h2 className="text-lg font-semibold mb-2 text-center">Delete User</h2>
                            <p className="mb-4 text-center">
                                Are you sure you want to delete <span className="font-bold">{selectedUser.name}</span>?<br />
                                This action cannot be undone.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleCancelDelete}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
