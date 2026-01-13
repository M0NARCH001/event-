"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EventPage from "@/components/event-org/EventPage";

const CreateEventContent = () => {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const startDirectly = mode === "create" || searchParams.get("startDirectly") === "true";

    return <EventPage isDashboardMode={true} startDirectly={startDirectly} />;
};

const CreateEventPage = () => {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateEventContent />
            </Suspense>
        </DashboardLayout>
    );
};

export default CreateEventPage;
