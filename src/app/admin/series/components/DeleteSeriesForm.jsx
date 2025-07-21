"use client";

import React, { useActionState } from 'react';
import { deleteSeriesAction } from '../libs/action';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

const initialState = {
    message: "",
    success: false,
    redirectUrl: "/admin/series"
};

const DeleteButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
            disabled={pending}
        >
            {pending ? "Loading..." : "Hapus"}
        </button>
    );
}

const DeleteSeriesForm = ({ seriesId }) => {
    const router = useRouter();
    
    // Create a bound version of the action that includes the ID
    const deleteWithId = async (prevState, formData) => {
        return deleteSeriesAction(prevState, formData, seriesId);
    };

    const [state, formAction] = useActionState(deleteWithId, initialState);

    useEffect(() => {
        if (state.success) {
            router.push(state.redirectUrl);
        }
    }, [state.success, state.redirectUrl, router]);

    return (
        <form action={formAction}>
            <DeleteButton/>
        </form>
    );
}

export default DeleteSeriesForm;
