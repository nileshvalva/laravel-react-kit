import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users/index',
    },
];

type UserProps = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export default function EditUser({ user }: UserProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/users/${user.id}/update`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="p-4 space-y-4">
                <div className="overflow-x-auto">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                autoComplete="name"
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                autoComplete="email"
                                placeholder="Email address"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password (Leave blank to keep unchanged)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                autoComplete="new-password"
                                placeholder="New password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
