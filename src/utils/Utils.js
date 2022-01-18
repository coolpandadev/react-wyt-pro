import React from "react";

import { useLocation } from "react-router-dom"

export const useQuery = () => {
    const { search } = useLocation();
    
    // useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.
    return React.useMemo(() => new URLSearchParams(search), [search]);
}