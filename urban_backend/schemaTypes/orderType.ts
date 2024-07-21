import { defineField, defineType, defineArrayMember } from "sanity";

export const orderType = defineType({
    name: "order",
    title: "Order",
    type: "document",
    fields: [
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: [{ type: "user" }]
        }),
        defineField({
            name: "orderItems",
            title: "Order Items",
            type: "array",
            of: [
                defineArrayMember({ type: "reference", to: [{ type: "product" }] })
            ]
        }),
        defineField({
            name: "total",
            title: "Total",
            type: "number",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
        }),
    ]
})