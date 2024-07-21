import { defineField, defineType, defineArrayMember } from "sanity";

export const reviewType = defineType({
    name: "review",
    title: "Review",
    type: "document",
    fields: [
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: [{ type: "user" }]
        }),
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (value) => value.min(1).max(5),
        }),
        defineField({
            name: "comment",
            title: "Comment",
            type: "text",
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
        }),
    ]
})