"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

interface LazyLoadProps {
  children: React.ReactNode;

  placeholderHeight?: string;
}

export default function LazyLoad({
  children,
  placeholderHeight = "100vh",
}: LazyLoadProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,

    rootMargin: "200px 0px",
  });

  return (
    <div
      ref={ref}
      style={{ minHeight: !inView ? placeholderHeight : undefined }}
    >
      {inView ? children : null}
    </div>
  );
}
