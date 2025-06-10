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

export default function User() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        name: '',
        password: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/users/store')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="p-4 space-y-4">
                <div className="overflow-x-auto">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className={`mt-1 block w-full ${errors.name ? 'border-red-600' : ''}`}
                                // required
                                autoComplete="name"
                                placeholder="Full name"
                                value={data.name}
                                // onChange={e => setData('name', e.target.value)}
                                onChange={e => {
                                    setData('name', e.target.value);
                                    if (errors.name) errors.name = undefined;
                                }}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className={`mt-1 block w-full ${errors.email ? 'border-red-600' : ''}`}
                                // required
                                autoComplete="email"
                                placeholder="Email address"
                                value={data.email}
                                onChange={e => {
                                    setData('email', e.target.value);
                                    if (errors.email) errors.email = undefined;
                                }}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                // required
                                autoComplete="password"
                                onChange={e => {
                                    setData('password', e.target.value);
                                    if (errors.password) errors.password = undefined;
                                }}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
