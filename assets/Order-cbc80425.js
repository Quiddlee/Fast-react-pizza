import{r as f,j as e,f as d,e as j,y as x,z as u,U as h}from"./index-9eb4c900.js";const N=f.memo(function({item:s,isLoadingIngredients:r,ingredients:t}){const{quantity:a,name:i,totalPrice:l}=s;return e.jsxs("li",{className:"space-y-1 py-3",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4 text-sm",children:[e.jsxs("p",{children:[e.jsxs("span",{className:"font-bold",children:[a,"×"]})," ",i]}),e.jsx("p",{className:"font-bold",children:d(l)})]}),e.jsx("p",{className:`${r?"animate-pulse":""} text-sm capitalize italic text-stone-500`,children:r?"Loading...":t==null?void 0:t.join(", ")})]})});function b(){const[o,s]=j(),{id:r,status:t,priority:a,priorityPrice:i,orderPrice:l,estimatedDelivery:n,cart:p}=o,m=x(n)>=0;return e.jsxs("div",{className:"gap-2 space-y-8 px-4 py-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between",children:[e.jsxs("h2",{className:"text-xl font-semibold",children:["Order #",r," status"]}),e.jsxs("div",{className:"space-x-2",children:[a&&e.jsx("span",{className:"rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50",children:"Priority"}),e.jsxs("span",{className:"rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50",children:[t," order"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5",children:[e.jsx("p",{className:"font-medium",children:m?`Only ${x(n)} minutes left 😃`:"Order should have arrived"}),e.jsxs("p",{className:"text-xs text-stone-500",children:["(Estimated delivery: ",u(n),")"]})]}),e.jsx("ul",{className:"divide-y divide-stone-200 border-b border-t",children:p.map(c=>e.jsx(N,{item:c,ingredients:s==null?void 0:s.find(y=>y.id===c.pizzaId).ingredients},c.pizzaId))}),e.jsxs("div",{className:"space-y-2 bg-stone-200 px-4 py-6",children:[e.jsxs("p",{className:"text-sm font-medium text-stone-600",children:["Price pizza: ",d(l)]}),a&&e.jsxs("p",{className:"text-sm font-medium text-stone-600",children:["Price priority: ",d(i)]}),e.jsxs("p",{className:"font-bold",children:["To pay on delivery: ",d(l+i)]})]}),!a&&e.jsx(h,{})]})}b.displayName="Order";export{b as Component};