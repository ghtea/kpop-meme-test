import {useRouter} from "next/router";
import React, {FunctionComponent, useEffect} from "react";

import * as ga from "../ga"

export const RouterProvider: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: unknown) => {
      ga.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  
  return (
    <>
      
    </>
  );
};