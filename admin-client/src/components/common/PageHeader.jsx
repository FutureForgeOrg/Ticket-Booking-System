import { Button } from "../ui/button";

import React from 'react'

function PageHeader({ title, actionText, onAction }) {
    return (
        <>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
                {actionText && (
                    <Button onClick={onAction}>{actionText}</Button>
                )}
            </div>
        </>
    )
}

export default PageHeader