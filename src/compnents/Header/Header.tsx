import React, {useCallback, useMemo, useRef, useState} from "react";
import {useMediaQuery} from "@react-hook/media-query";
import {SM} from "../../constants/media";
import {HeaderContainer} from "./HeaderContainer";
import _ from "lodash";
import {HeaderInput} from "./HeaderInput";

interface HeaderProps {
    listRefs: React.MutableRefObject<HTMLLIElement>[] | undefined;
}
export const Header: React.FC<HeaderProps> = ({
                                                  listRefs
                                              }) => {
    const [inputNumber, setInputNumber] = useState<number | undefined>()
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const isScreenSmall = useMediaQuery(`only screen and (max-width: ${SM})`);

    const containerHeight = useMemo(() => {
        if (!containerRef.current) {
            return undefined;
        }

        return containerRef.current.getBoundingClientRect().height;
    }, [containerRef.current, isScreenSmall]);

    const scrollToElement = useCallback((element: HTMLElement | undefined) => {
        if (!element || !containerHeight) {
            return;
        }

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - containerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }, [containerHeight]);

    return (
        <HeaderContainer ref={containerRef}>
            <button
                disabled={_.isEmpty(listRefs)}
                onClick={() => scrollToElement(_.first(listRefs)?.current)}
            >
                Первая
            </button>

            <HeaderInput type="text" onInput={({currentTarget}) => {
                const numberValue = Number.parseInt(currentTarget.value);
                setInputNumber(Number.isFinite(numberValue) ? numberValue - 1: undefined);
            }}/>

            <button
                disabled={
                    _.isUndefined(listRefs) ||
                    _.isUndefined(inputNumber)  ||
                    _.isEmpty(listRefs) ||
                    _.isUndefined(listRefs[inputNumber])
                }

                onClick={() => {
                    if (inputNumber === undefined || listRefs === undefined) {
                        return;
                    }

                    scrollToElement(listRefs[inputNumber]?.current);
                }}
            >
                Перейти
            </button>

            <button
                disabled={_.isEmpty(listRefs)}
                onClick={() => scrollToElement(_.last(listRefs)?.current)}
            >
                Последняя
            </button>
        </HeaderContainer>
    );
};