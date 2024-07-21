import { defineField, defineType, defineArrayMember } from "sanity";

export const userType = defineType({
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "profileImage",
            title: "Profile Image",
            type: "image",
        }),
        defineField({
            name: "orders",
            title: "Orders",
            type: "array",
            of: [{
                type: "reference", to: [{ type: "order" }]
            }]
        }),
        defineField({
            name: "reviews",
            title: "Reviews",
            type: "array",
            of: [{
                type: "reference", to: [{ type: "review" }]
            }]
        }),
    ]
})