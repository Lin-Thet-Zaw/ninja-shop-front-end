export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S", checked: true },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
      { value: "XXL", label: "XXL", checked: false },
    ],
  },
];

export const singleFilter = [
    {
      id: "price",
      name: "Price",
      options: [
        { value: "159-399", label: "$159 - $399" },
        { value: "400-599", label: "$400 - $599" }
    ]
    },
    {
      id:"discounted",
      name:"Discount Range",
      options:[
          {value:"10", label:"10% above"},
          {value:"20", label:"20% above"}
      ]
    }
];