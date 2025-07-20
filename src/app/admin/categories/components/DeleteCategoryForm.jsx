"use client";

import React, { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteCategory } from '../libs/action';
import { useRouter } from 'next/navigation';    

const initialState = {
    message: "",
    success: false,
}

const DeleteButton = ()  => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
            {pending ? "Deleting..." : "Hapus"}
        </button>
    );
};

const DeleteCategoryForm = ({ categoryId }) => {

    const router = useRouter();

    const deleteById = (_, formData) => deleteCategory(_, formData, categoryId);

    const [state, formAction] = useActionState(deleteById, initialState);

    useEffect(() => {
        if (state.success && state.redirectUrl) {
            router.push(state.redirectUrl);
        }
    }, [state, router]);


    return (
        <form action={formAction}>
            <DeleteButton />
        </form>
    );
};

export default DeleteCategoryForm;