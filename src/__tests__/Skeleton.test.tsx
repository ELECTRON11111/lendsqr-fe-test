import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Skeleton from "../components/Skeleton/Skeleton";

describe('Skeleton', () => {
    it('should render skeleton component', () => {
        render(<Skeleton /> );
        const skeletonComponent = screen.getByTestId("skeleton");

        expect(skeletonComponent).toBeInTheDocument();
    });
})