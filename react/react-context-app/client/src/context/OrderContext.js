import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

export function OrderContextProvider(props) {
    const [orderCounts, setOrderCounts] = useState({
        products: new Map(),
        options: new Map(),
    });

    const [totals, setTotals] = useState({
        products: 0,
        options: 0,
        total: 0
    })

    const pricePerItem = {
        products: 1000,
        options: 500
    }

    const calculateSubtotal = (orderType, orderCounts) => {
        let optionCount = 0;
        for (const count of orderCounts[orderType].values()) {
            optionCount += count;
        }
    }

    useEffect(() => {
        const producsTotal = calculateSubtotal("products", orderCounts);
        const optionsTotal = calculateSubtotal("options", orderCounts);
        const total = producsTotal + optionsTotal;
        setTotals({
            products: producsTotal,
            options: optionsTotal,
            total
        })
    }, [orderCounts])

    {/*useMemo로 감싸준 이유: state가 업데이트 되면 
    <OrderContextProvider>로 감싸준 것이 다 리렌더링 되기 때문에 이것을 최소화 함*/}
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, orderType) {
            const newOrderCounts = [{ ...orderCounts }];

            const orderCountsMap = orderCounts[orderType];
            orderCountsMap.set(itemName, parseInt(newItemCount));

            setOrderCounts(newOrderCounts);
        }
        
        return [{ ... orderCounts, totals }, updateItemCount];
    }, [orderCounts, totals]);

    return <OrderContext.Provider value={value} {...props} />
}