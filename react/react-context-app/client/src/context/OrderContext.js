import { createContext, useMemo, useState } from "react";

const OrderContext = createContext();

export function OrderContextProvider(props) {
    const [orderCounts, setOrderCounts] = useState({
        products: new Map(),
        options: new Map(),
    });

    {/*useMemo로 감싸준 이유: state가 업데이트 되면 <OrderContextProvider>로 감싸준 것이 다 리렌더링 되기 때문에 최소화 하기위해*/}
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, orderType) {
            const newOrderCounts = [{ ...orderCounts }];

            const orderCountsMap = orderCounts[orderType];
            orderCountsMap.set(itemName, parseInt(newItemCount));

            setOrderCounts(newOrderCounts);
        }
        
        return [{ ... orderCounts }, updateItemCount];
    }, [orderCounts]);

    return <OrderContext.Provider value={value} {...props} />
}