import { Flashcard } from '@/components/mind/EmbeddCard';
import { useEffect, 
    // useState 
} from 'react'

const RetrieveNotion = () => {
    const data = {
        "object": "list",
        "results": [
            {
                "object": "block",
                "id": "25a7e2da-03a1-80a2-8026-c6898c3a3810",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-25T10:08:00.000Z",
                "last_edited_time": "2025-08-25T10:12:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_1",
                "heading_1": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Contents",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Contents",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80e9-a48e-c82457e6c7f2",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:27:00.000Z",
                "last_edited_time": "2025-08-26T09:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "1. Objectives",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "1. Objectives",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80d6-85c5-e3968aa65ff6",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:27:00.000Z",
                "last_edited_time": "2025-08-26T09:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Know to write simple queries",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Know to write simple queries",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8033-8a74-eea0eba991a7",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:27:00.000Z",
                "last_edited_time": "2025-08-26T09:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Understand about null value",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Understand about null value",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8078-823c-e1f389d87965",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:27:00.000Z",
                "last_edited_time": "2025-08-26T09:28:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "String data type, date-time data type",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "String data type, date-time data type",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8085-82b2-fa773c7f6627",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:28:00.000Z",
                "last_edited_time": "2025-08-26T09:28:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Know how to order the output",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Know how to order the output",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80e1-8d15-fb69fc45037d",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:28:00.000Z",
                "last_edited_time": "2025-09-05T09:58:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_1",
                "heading_1": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SQL overview",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SQL overview",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80b8-847b-c1c1cf351929",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:28:00.000Z",
                "last_edited_time": "2025-08-26T09:30:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "From mathematical to Computer : RA (relational algebra) to SQL",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "From mathematical to Computer : RA (relational algebra) to SQL",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-808d-bfb1-cf0bdf50fdb2",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:29:00.000Z",
                "last_edited_time": "2025-08-26T09:29:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2. What is SQL ?",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2. What is SQL ?",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80e8-b00d-ce31ac751025",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:29:00.000Z",
                "last_edited_time": "2025-08-26T09:31:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SEQUEL (structured English query language) by IBM in 1974",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SEQUEL (structured English query language) by IBM in 1974",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8027-817a-dad08ef1de42",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:31:00.000Z",
                "last_edited_time": "2025-08-26T09:32:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Later it’s became to SQL (structural query language) - ngôn ngữ truy vấn",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Later it’s became to SQL (structural query language) - ngôn ngữ truy vấn",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8065-a0ff-ed36a6a10579",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:32:00.000Z",
                "last_edited_time": "2025-08-26T09:32:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Work with DBMS",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Work with DBMS",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8095-af9a-eda5d98a26b8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:32:00.000Z",
                "last_edited_time": "2025-08-26T09:33:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Easy to learn",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Easy to learn",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8016-b9bf-c96bd77c82f3",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:33:00.000Z",
                "last_edited_time": "2025-08-26T09:33:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "image",
                "image": {
                    "caption": [],
                    "type": "file",
                    "file": {
                        "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/6c1fa3d3-87be-4be8-8658-502e3bdea87b/71a2ea5f-4199-4fc7-93a4-9bc8a1f7a9a6/Screenshot_from_2025-08-26_16-33-27.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI4GCGEC%2F20250906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250906T054048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIBWlkTUWvqenv9PGx%2FzsJn%2F8PZ9Q35Omj3aOovSzKSn%2FAiBU8VeeEqWrao6rPcV9o%2FQWPHEtJwnZGnclD76YGfs8eiqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVg%2F%2B%2Bz4PsFjRXeOvKtwDcU2vlOZoTTiNB%2FZ9E%2BzH1ieRG%2BaV%2BrvqfzrbZIYsudeR%2BBA%2B7xBPDbBFRSUHA87Calp368uaFuK%2FBZqY%2Ft1clGZ2ZweoWTXZdmRmP4zH9ipRG1syX1AT8W7X5skk%2F%2BBp3ovLGwHHlTwpfUieO7bk8uoplMvqTQxUjdkkLOwpa2shZFtleDIFhgjKxtVzbRkXapBjROCtM%2FFxlxZjsDorMDQM3XUgAMVsLwigeyDt%2BpxzNHoaNe4dZ6PSuvAMpw0zRJsIa4ibPO%2FdUr8rKz2iVdbzbluKB9bVyNE0ju16cZn8khaNjj9mw%2FqnxMRqXQhk2hYYQdQ3J0MIPmvF%2FFcwtbP5FboN%2Buz2AgDegdPb8T%2Bg0NqnxB96isfUJugGniOIhkRhlt8j0pz76bpp5vWS53urUuoIUFFqyUwupPi1mGcjboSUyvKxMSPbZAM6CpEGfKTJJq2mPBJS5zZXASYlg3O0hY919YmlpDIfjspFkjY45x%2FDYpu7H83N4ijJLMD1TR8XP3O5rSmuxXg4axKrJ4D3rYvyfHQVtFlfmLzVimwi3GkIMdfdKoiaLJjrfVrmHO0eE7Gd4CYfZQA5suT1h8i9pxgSg5X%2FDr%2Bi%2BqevkN0nZwZwr8xeYH2raisw3Y3vxQY6pgHumQXf60Lk4fR%2BubqlMrPoAm9NqQHYNVwxOnH7lRkrtoZ6WeJ%2BkNL0q3PBVDyFqQ%2FnTBA%2F3lLvTFTiVdskjaMOyq3G8u9OI4gHJvzxm89VE8xN2OXoTas%2BSQDincJsgq%2BMmrEr3ctAS%2FvxO3b9BUwdC5ll2SK5yu8N1WR1X2vKCbw3%2BfVi5RL3OSCM2wwDKoWYPbR88SAq0OBhJN%2B4b9fBiCwPVlTb&X-Amz-Signature=c354d8fb45b0b70e4716d4d4cab7e7e14f1a42df1178a3c6ff6f722934006d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
                        "expiry_time": "2025-09-06T06:40:48.115Z"
                    }
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c1-9131-d1b18e38c3cb",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:34:00.000Z",
                "last_edited_time": "2025-08-26T09:34:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2.1. From RA to SQL",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2.1. From RA to SQL",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80ed-b9f5-f3fa150a0f92",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:35:00.000Z",
                "last_edited_time": "2025-08-26T09:35:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Base on relational algebra but not identical",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Base on relational algebra but not identical",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-800b-99aa-df530f32c9ae",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:35:00.000Z",
                "last_edited_time": "2025-08-26T09:35:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Relations ↔ tables",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Relations ↔ tables",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8079-8f40-f1f0c31f6c7c",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:35:00.000Z",
                "last_edited_time": "2025-08-26T09:35:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Tuples ↔ rows",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Tuples ↔ rows",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8026-9903-ccb8c5885485",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:35:00.000Z",
                "last_edited_time": "2025-08-26T09:36:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Attributes ↔ Columns",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Attributes ↔ Columns",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8054-85a0-cdf93f5eb33c",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:36:00.000Z",
                "last_edited_time": "2025-08-26T09:37:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "quote",
                "quote": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Not like relation, table is not a set. Duplicates not auto removed (not good for real use)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Not like relation, table is not a set. Duplicates not auto removed (not good for real use)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-804c-bbbe-dd0784a54e14",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:37:00.000Z",
                "last_edited_time": "2025-08-26T09:38:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Like a relation, the order of rows in a table is irrelevant (thứ tự trong bảnh không liên quan)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Like a relation, the order of rows in a table is irrelevant (thứ tự trong bảnh không liên quan)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c5-8840-fb5ec4249bb9",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:39:00.000Z",
                "last_edited_time": "2025-08-26T09:39:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2.2. Timeline",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2.2. Timeline",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80f1-af44-e53aa73d8d72",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:39:00.000Z",
                "last_edited_time": "2025-08-26T09:43:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "image",
                "image": {
                    "caption": [],
                    "type": "file",
                    "file": {
                        "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/6c1fa3d3-87be-4be8-8658-502e3bdea87b/6b0fe4d5-35f2-481f-a118-8547ff24ebcd/Screenshot_from_2025-08-26_16-39-06.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI4GCGEC%2F20250906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250906T054048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIBWlkTUWvqenv9PGx%2FzsJn%2F8PZ9Q35Omj3aOovSzKSn%2FAiBU8VeeEqWrao6rPcV9o%2FQWPHEtJwnZGnclD76YGfs8eiqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVg%2F%2B%2Bz4PsFjRXeOvKtwDcU2vlOZoTTiNB%2FZ9E%2BzH1ieRG%2BaV%2BrvqfzrbZIYsudeR%2BBA%2B7xBPDbBFRSUHA87Calp368uaFuK%2FBZqY%2Ft1clGZ2ZweoWTXZdmRmP4zH9ipRG1syX1AT8W7X5skk%2F%2BBp3ovLGwHHlTwpfUieO7bk8uoplMvqTQxUjdkkLOwpa2shZFtleDIFhgjKxtVzbRkXapBjROCtM%2FFxlxZjsDorMDQM3XUgAMVsLwigeyDt%2BpxzNHoaNe4dZ6PSuvAMpw0zRJsIa4ibPO%2FdUr8rKz2iVdbzbluKB9bVyNE0ju16cZn8khaNjj9mw%2FqnxMRqXQhk2hYYQdQ3J0MIPmvF%2FFcwtbP5FboN%2Buz2AgDegdPb8T%2Bg0NqnxB96isfUJugGniOIhkRhlt8j0pz76bpp5vWS53urUuoIUFFqyUwupPi1mGcjboSUyvKxMSPbZAM6CpEGfKTJJq2mPBJS5zZXASYlg3O0hY919YmlpDIfjspFkjY45x%2FDYpu7H83N4ijJLMD1TR8XP3O5rSmuxXg4axKrJ4D3rYvyfHQVtFlfmLzVimwi3GkIMdfdKoiaLJjrfVrmHO0eE7Gd4CYfZQA5suT1h8i9pxgSg5X%2FDr%2Bi%2BqevkN0nZwZwr8xeYH2raisw3Y3vxQY6pgHumQXf60Lk4fR%2BubqlMrPoAm9NqQHYNVwxOnH7lRkrtoZ6WeJ%2BkNL0q3PBVDyFqQ%2FnTBA%2F3lLvTFTiVdskjaMOyq3G8u9OI4gHJvzxm89VE8xN2OXoTas%2BSQDincJsgq%2BMmrEr3ctAS%2FvxO3b9BUwdC5ll2SK5yu8N1WR1X2vKCbw3%2BfVi5RL3OSCM2wwDKoWYPbR88SAq0OBhJN%2B4b9fBiCwPVlTb&X-Amz-Signature=37c9e004cd307a8b4d3f1730c218ae4a5f6b3aeae10b0eeb208fc85921a9412a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
                        "expiry_time": "2025-09-06T06:40:48.126Z"
                    }
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-803c-8c2c-dfd17ae7f9e5",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:39:00.000Z",
                "last_edited_time": "2025-08-26T09:39:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2.3. Sub language of SQL",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2.3. Sub language of SQL",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8008-975c-c3992aee6bf8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:43:00.000Z",
                "last_edited_time": "2025-09-05T09:48:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "\nflowchart LR\n    SQL[SQL]\n\n    DDL[DDL - Data Definition Language]\n    DML[DML - Data Manipulation Language]\n    DCL[DCL - Data Control Language]\n\n    C[Create]\n    R[Read]\n    U[Update]\n    D[Delete]\n\n    SQL --> DDL\n    SQL --> DML\n    SQL --> DCL\n\n    DML --> C\n    DML --> R\n    DML --> U\n    DML --> D\nclassDef purple fill:#6a1b9a,stroke:#6a1b9a,color:#ffffff;\nclassDef blue fill:#0b67b2,stroke:#0b67b2,color:#ffffff;\nclassDef dark fill:#1f3354,stroke:#1f3354,color:#ffffff;\n\nclass DDL,DML,DCL purple;\nclass C,R,U,D blue;\nclass SQL dark;\n",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "\nflowchart LR\n    SQL[SQL]\n\n    DDL[DDL - Data Definition Language]\n    DML[DML - Data Manipulation Language]\n    DCL[DCL - Data Control Language]\n\n    C[Create]\n    R[Read]\n    U[Update]\n    D[Delete]\n\n    SQL --> DDL\n    SQL --> DML\n    SQL --> DCL\n\n    DML --> C\n    DML --> R\n    DML --> U\n    DML --> D\nclassDef purple fill:#6a1b9a,stroke:#6a1b9a,color:#ffffff;\nclassDef blue fill:#0b67b2,stroke:#0b67b2,color:#ffffff;\nclassDef dark fill:#1f3354,stroke:#1f3354,color:#ffffff;\n\nclass DDL,DML,DCL purple;\nclass C,R,U,D blue;\nclass SQL dark;\n",
                            "href": null
                        }
                    ],
                    "language": "mermaid"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c7-af9f-cb4da54b11e1",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:54:00.000Z",
                "last_edited_time": "2025-08-26T09:54:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2.4. SQL commands are sequential",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2.4. SQL commands are sequential",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c7-982f-fae00e62397d",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:54:00.000Z",
                "last_edited_time": "2025-08-26T09:54:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Execute by order",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Execute by order",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-801a-a3bb-c9b8e370c1cd",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:54:00.000Z",
                "last_edited_time": "2025-08-26T09:55:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "DDL commands not like Java/C declarations",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "DDL commands not like Java/C declarations",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8071-9713-e3a3a58ca2df",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:55:00.000Z",
                "last_edited_time": "2025-08-26T09:57:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "DDL and DML command can be mixed",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "DDL and DML command can be mixed",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8080-b06b-db53cd4bff7f",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:57:00.000Z",
                "last_edited_time": "2025-08-26T09:58:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "2.5. Know about style …",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "2.5. Know about style …",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c7-835f-cf3557e8b22e",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T09:58:00.000Z",
                "last_edited_time": "2025-08-26T10:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Terminologies",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Terminologies",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-800d-b364-dc31effadce8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:08:00.000Z",
                "last_edited_time": "2025-08-26T10:09:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3. DDL (data definition language)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3. DDL (data definition language)",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80a8-83e6-d90ead8b42e5",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:10:00.000Z",
                "last_edited_time": "2025-08-26T10:10:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.1. Commands",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.1. Commands",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8053-b7d3-d346f6dc799d",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:10:00.000Z",
                "last_edited_time": "2025-08-26T10:11:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE DATABASE\nCREATE TABLE\nALTER TABLE\nRENAME TABLE\nDROP TABLE\nCREATE INDEX\nDROP INDEX\nCREATE VIEW",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE DATABASE\nCREATE TABLE\nALTER TABLE\nRENAME TABLE\nDROP TABLE\nCREATE INDEX\nDROP INDEX\nCREATE VIEW",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80c0-a072-c58713d846e8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:12:00.000Z",
                "last_edited_time": "2025-08-26T10:13:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "image",
                "image": {
                    "caption": [
                        {
                            "type": "text",
                            "text": {
                                "content": " - Super_ssn must be found in Ssn of EMPLOYEE\n- Mgr_ssn of DEPARTMNET must exist in Ssn of EMPLOYEE\n-  Dno of EMPLOYEE must exist in Dnumber of DEPARTMENT\n-  Dnum of PROJECT must exist in Dnumber of DEPARTMENT\n-  Dnumber of DEPT_LOCATIONS must exist in Dnumber of DEPARTMENT",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": " - Super_ssn must be found in Ssn of EMPLOYEE\n- Mgr_ssn of DEPARTMNET must exist in Ssn of EMPLOYEE\n-  Dno of EMPLOYEE must exist in Dnumber of DEPARTMENT\n-  Dnum of PROJECT must exist in Dnumber of DEPARTMENT\n-  Dnumber of DEPT_LOCATIONS must exist in Dnumber of DEPARTMENT",
                            "href": null
                        }
                    ],
                    "type": "file",
                    "file": {
                        "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/6c1fa3d3-87be-4be8-8658-502e3bdea87b/6a8951b4-5cac-44a9-97f2-e8135e1d4225/Screenshot_from_2025-08-26_17-12-05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI4GCGEC%2F20250906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250906T054049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIBWlkTUWvqenv9PGx%2FzsJn%2F8PZ9Q35Omj3aOovSzKSn%2FAiBU8VeeEqWrao6rPcV9o%2FQWPHEtJwnZGnclD76YGfs8eiqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVg%2F%2B%2Bz4PsFjRXeOvKtwDcU2vlOZoTTiNB%2FZ9E%2BzH1ieRG%2BaV%2BrvqfzrbZIYsudeR%2BBA%2B7xBPDbBFRSUHA87Calp368uaFuK%2FBZqY%2Ft1clGZ2ZweoWTXZdmRmP4zH9ipRG1syX1AT8W7X5skk%2F%2BBp3ovLGwHHlTwpfUieO7bk8uoplMvqTQxUjdkkLOwpa2shZFtleDIFhgjKxtVzbRkXapBjROCtM%2FFxlxZjsDorMDQM3XUgAMVsLwigeyDt%2BpxzNHoaNe4dZ6PSuvAMpw0zRJsIa4ibPO%2FdUr8rKz2iVdbzbluKB9bVyNE0ju16cZn8khaNjj9mw%2FqnxMRqXQhk2hYYQdQ3J0MIPmvF%2FFcwtbP5FboN%2Buz2AgDegdPb8T%2Bg0NqnxB96isfUJugGniOIhkRhlt8j0pz76bpp5vWS53urUuoIUFFqyUwupPi1mGcjboSUyvKxMSPbZAM6CpEGfKTJJq2mPBJS5zZXASYlg3O0hY919YmlpDIfjspFkjY45x%2FDYpu7H83N4ijJLMD1TR8XP3O5rSmuxXg4axKrJ4D3rYvyfHQVtFlfmLzVimwi3GkIMdfdKoiaLJjrfVrmHO0eE7Gd4CYfZQA5suT1h8i9pxgSg5X%2FDr%2Bi%2BqevkN0nZwZwr8xeYH2raisw3Y3vxQY6pgHumQXf60Lk4fR%2BubqlMrPoAm9NqQHYNVwxOnH7lRkrtoZ6WeJ%2BkNL0q3PBVDyFqQ%2FnTBA%2F3lLvTFTiVdskjaMOyq3G8u9OI4gHJvzxm89VE8xN2OXoTas%2BSQDincJsgq%2BMmrEr3ctAS%2FvxO3b9BUwdC5ll2SK5yu8N1WR1X2vKCbw3%2BfVi5RL3OSCM2wwDKoWYPbR88SAq0OBhJN%2B4b9fBiCwPVlTb&X-Amz-Signature=d13fe4e9c8e0ab837a341be711f7ef0524945414fa439c2178ebb9d29019870d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
                        "expiry_time": "2025-09-06T06:40:48.242Z"
                    }
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80b0-8a63-c5846507c60e",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:12:00.000Z",
                "last_edited_time": "2025-08-26T10:17:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "For example",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "For example",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80b6-8734-ef5292e7e5b4",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:17:00.000Z",
                "last_edited_time": "2025-08-26T10:18:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Create database",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Create database",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80fe-a625-cb80ec0ecefb",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:14:00.000Z",
                "last_edited_time": "2025-08-26T10:18:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "# create\nCREATE DATABASE Company\n# use database\nUSE Company\n# Subseuqent will operate on the Company database by default ",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "# create\nCREATE DATABASE Company\n# use database\nUSE Company\n# Subseuqent will operate on the Company database by default ",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80e2-8d12-db10efdb8493",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:20:00.000Z",
                "last_edited_time": "2025-08-26T10:20:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.2. Data types",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.2. Data types",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8015-9d6f-f4d4a2fac8bd",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:22:00.000Z",
                "last_edited_time": "2025-08-27T09:40:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Char(n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Char(n)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8024-a992-d35e49821c1f",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:22:00.000Z",
                "last_edited_time": "2025-08-26T10:28:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Varchar(n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Varchar(n)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80b7-857c-cc42837c89c7",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:25:00.000Z",
                "last_edited_time": "2025-08-26T10:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Int",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Int",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80fa-958f-c9150152d898",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Smallint",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Smallint",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8074-9fdd-e64f88243a66",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:25:00.000Z",
                "last_edited_time": "2025-08-26T10:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Numeric(p,d)",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Numeric(p,d)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-804a-b53d-f8d1cc8c99dd",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Real, double precision",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Real, double precision",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-803e-93b0-fe6eb2943b47",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:27:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Float(n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Float(n)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8098-ae59-e6788f561f5b",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:26:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Date",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Date",
                            "href": null
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": ": Made up of year-month-day in the format yyyy-mm-dd",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": ": Made up of year-month-day in the format yyyy-mm-dd",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-8000-88cf-e6f134a049d0",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:26:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Time",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Time",
                            "href": null
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": ": Made up of hour:minute:second in the format hh:mm:ss",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": ": Made up of hour:minute:second in the format hh:mm:ss",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80f0-aba7-c60cc9bc47df",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:26:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Timestamp",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Timestamp",
                            "href": null
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": ": Has both DATE and TIME components",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": ": Has both DATE and TIME components",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80a8-a33a-eaf9e9feb516",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:23:00.000Z",
                "last_edited_time": "2025-08-26T10:26:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Others:",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Others:",
                            "href": null
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": " Boolean, Float, Double Precision",
                                "link": null
                            },
                            "annotations": {
                                "bold": true,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": " Boolean, Float, Double Precision",
                            "href": null
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "\nSee user’s manual for more data types. ",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "\nSee user’s manual for more data types. ",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80ca-b4cb-c82baae24124",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:28:00.000Z",
                "last_edited_time": "2025-08-26T10:28:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "For example, create TABLE",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "For example, create TABLE",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-80da-a732-dd35c70bb7da",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:18:00.000Z",
                "last_edited_time": "2025-08-26T10:32:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE Employee (\n    EmployeeID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT CHECK (Age > 0),\n    DeptID INT,\n    FOREIGN KEY (DeptID) REFERENCES Department(Dnumber)\n);",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE Employee (\n    EmployeeID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT CHECK (Age > 0),\n    DeptID INT,\n    FOREIGN KEY (DeptID) REFERENCES Department(Dnumber)\n);",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25b7e2da-03a1-804f-94a4-f3c4cea6c542",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-26T10:29:00.000Z",
                "last_edited_time": "2025-08-26T10:32:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE Department (\n    Dnumber INT PRIMARY KEY,\n    Dname VARCHAR(50) UNIQUE NOT NULL,\n    Mgr_ssn INT,\n    Mgr_startdate DATE,\n    FOREIGN KEY (Mgr_ssn) REFERENCES Employee(EmployeeID)\n);",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE Department (\n    Dnumber INT PRIMARY KEY,\n    Dname VARCHAR(50) UNIQUE NOT NULL,\n    Mgr_ssn INT,\n    Mgr_startdate DATE,\n    FOREIGN KEY (Mgr_ssn) REFERENCES Employee(EmployeeID)\n);",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8040-8fab-fc7b9bda0eee",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T08:51:00.000Z",
                "last_edited_time": "2025-08-27T08:57:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "# 1. If this statement issue first, \n# we can not specify Dno as FK (foreign key) in that CREATE command\nCREATE TABLE Employee\n\n# An ALTER command must be used to change the schema of Employee\n# After CREATE TABLE Department to add FK\n\nALTER TABLE Employee\nADD CONSTRAINT FOREIGN KEY Dno\nREFERENCES Department(Dnumber)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "# 1. If this statement issue first, \n# we can not specify Dno as FK (foreign key) in that CREATE command\nCREATE TABLE Employee\n\n# An ALTER command must be used to change the schema of Employee\n# After CREATE TABLE Department to add FK\n\nALTER TABLE Employee\nADD CONSTRAINT FOREIGN KEY Dno\nREFERENCES Department(Dnumber)",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8056-8838-def88199f0bd",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:00:00.000Z",
                "last_edited_time": "2025-08-27T09:01:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Check the clause (check attributes ?)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Check the clause (check attributes ?)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-808b-b7cd-dfa7d9d9e318",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:01:00.000Z",
                "last_edited_time": "2025-08-27T09:03:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "For example",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "For example",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80a1-945e-f71a92d6ada2",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:03:00.000Z",
                "last_edited_time": "2025-08-27T09:03:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "assume that dept.number is 0 → 99",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "assume that dept.number is 0 → 99",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80ae-91cf-fe0fce64e14e",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:02:00.000Z",
                "last_edited_time": "2025-08-27T09:03:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE Department (\n\tDnumber INTEGER Default 0\n\tCHECK (Dnumber >= 0 AND Dnumber <= 99) \n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE Department (\n\tDnumber INTEGER Default 0\n\tCHECK (Dnumber >= 0 AND Dnumber <= 99) \n)",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8089-b81d-c7ff22987637",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:03:00.000Z",
                "last_edited_time": "2025-08-27T09:04:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CHECK also can be a clause",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CHECK also can be a clause",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-805f-afa4-f74b2179f210",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:04:00.000Z",
                "last_edited_time": "2025-08-27T09:06:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE Department (\n\tDept_create_date date,\n\tMgr_start_date date,\n\tCHECK (Dept_create_date <= Mgr_start_date)\n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE Department (\n\tDept_create_date date,\n\tMgr_start_date date,\n\tCHECK (Dept_create_date <= Mgr_start_date)\n)",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8040-8712-d0ed43750c5d",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:06:00.000Z",
                "last_edited_time": "2025-08-27T09:06:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.3. Multi attribute key",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.3. Multi attribute key",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-807d-a334-c5300196a005",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:06:00.000Z",
                "last_edited_time": "2025-08-27T09:07:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE Sells (\n\tbar CHAR(20);\n\tbeer VARCHAR(20);\n\tprice REAL;\n\tPRIMARY KEY (bar,beer);\n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE Sells (\n\tbar CHAR(20);\n\tbeer VARCHAR(20);\n\tprice REAL;\n\tPRIMARY KEY (bar,beer);\n)",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80a7-967c-c46cbb9e3fc4",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:07:00.000Z",
                "last_edited_time": "2025-08-27T09:10:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "For example",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "For example",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8064-88bb-d882e60c1972",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:10:00.000Z",
                "last_edited_time": "2025-08-27T09:38:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Create the table WORKS_ON, assuming tables EMPLOYEE\nand PROJECT have been created and Hours ranges from 1\nto 56.",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Create the table WORKS_ON, assuming tables EMPLOYEE\nand PROJECT have been created and Hours ranges from 1\nto 56.",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8020-8cb8-c2d1d42710cc",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:17:00.000Z",
                "last_edited_time": "2025-08-27T09:17:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.4. How to add column to existing table ??",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.4. How to add column to existing table ??",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80f9-aff9-d7a3ba2b2c63",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:17:00.000Z",
                "last_edited_time": "2025-08-27T09:18:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "For example",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "For example",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80c9-bf06-d1e48021ba32",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:18:00.000Z",
                "last_edited_time": "2025-08-27T09:19:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Add SSN (S_ssn) to Employee, table Employee is already",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Add SSN (S_ssn) to Employee, table Employee is already",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80bf-b78e-c957f4140922",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:20:00.000Z",
                "last_edited_time": "2025-08-27T09:21:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Set default VALUE for attribute",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Set default VALUE for attribute",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8086-924e-c3f86d3fb64d",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:22:00.000Z",
                "last_edited_time": "2025-08-27T09:22:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.5. Delete columns",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.5. Delete columns",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-805f-88b0-cae803f222a8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:22:00.000Z",
                "last_edited_time": "2025-08-27T09:22:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "ALTER TABLE Employee DROP COLUMN S_ssn;\n",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "ALTER TABLE Employee DROP COLUMN S_ssn;\n",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8062-bbd4-e03771678878",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:26:00.000Z",
                "last_edited_time": "2025-08-27T09:26:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.6. Make it perfect (referential integrity options)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.6. Make it perfect (referential integrity options)",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8072-ba86-f3d72bed2a86",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:37:00.000Z",
                "last_edited_time": "2025-08-27T09:37:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "column_list",
                "column_list": {}
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-801e-a97a-c9660c54f677",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:44:00.000Z",
                "last_edited_time": "2025-08-27T09:46:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "CREATE TABLE DEPARTMENT (\n\tMgr_ssn CHAR(9);\n\tFOREIGN KEY (Mgr_ssn) REFERENCES Employee(Ssn);\n\tON DELETE SET DEFAULT;\n\tON UPDATE CASCADE;\n)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "CREATE TABLE DEPARTMENT (\n\tMgr_ssn CHAR(9);\n\tFOREIGN KEY (Mgr_ssn) REFERENCES Employee(Ssn);\n\tON DELETE SET DEFAULT;\n\tON UPDATE CASCADE;\n)",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8044-bcec-e2436f29bd62",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:47:00.000Z",
                "last_edited_time": "2025-08-27T09:47:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "3.7. Some command",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "3.7. Some command",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-8070-bfb4-e102f0693f25",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:47:00.000Z",
                "last_edited_time": "2025-08-27T09:49:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "code",
                "code": {
                    "caption": [],
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SHOW DATABASES # show all table on sever\nSHOW TABLES # show all table on present DB \nDROP TABLE\nDROP DATABASE\nDESCRIBE table_name # only on MySQL, show structure of table",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SHOW DATABASES # show all table on sever\nSHOW TABLES # show all table on present DB \nDROP TABLE\nDROP DATABASE\nDESCRIBE table_name # only on MySQL, show structure of table",
                            "href": null
                        }
                    ],
                    "language": "sql"
                }
            },
            {
                "object": "block",
                "id": "25c7e2da-03a1-80c8-ad5a-d8dad69acbef",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-27T09:50:00.000Z",
                "last_edited_time": "2025-08-27T09:50:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_1",
                "heading_1": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SIMPLE DML QUERIES",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SIMPLE DML QUERIES",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8043-a8eb-c254c92e9467",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:49:00.000Z",
                "last_edited_time": "2025-08-28T15:49:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "4. SELECT commands",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "4. SELECT commands",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-804b-9fcf-e1ac5750fd03",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:49:00.000Z",
                "last_edited_time": "2025-08-28T15:50:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "A SELECT statement can retrieve information from database",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "A SELECT statement can retrieve information from database",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80df-81a6-d905f0b4c9e8",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:50:00.000Z",
                "last_edited_time": "2025-08-28T15:50:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Using SELECT statement",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Using SELECT statement",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8039-b5f1-f8a985921e6e",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:50:00.000Z",
                "last_edited_time": "2025-08-28T15:55:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Projection, to choose the columns in a table that you want returned by query",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Projection, to choose the columns in a table that you want returned by query",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80b9-88e8-d6a82194d785",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:52:00.000Z",
                "last_edited_time": "2025-08-28T15:55:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Selection, to choose the rows in a table (WHERE cause)",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Selection, to choose the rows in a table (WHERE cause)",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-802f-b634-e7fa40a733ec",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:53:00.000Z",
                "last_edited_time": "2025-08-28T15:56:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Joining, to bring together data that is stored in different tables by create link between them",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Joining, to bring together data that is stored in different tables by create link between them",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80a0-bcf9-f276467ab3f4",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:57:00.000Z",
                "last_edited_time": "2025-08-28T15:57:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "4.1. SQL data retrieve query structure",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "4.1. SQL data retrieve query structure",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80c1-bdf5-ca09b9236a11",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T15:57:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SELECT",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SELECT",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80d2-bf35-eb4055885f65",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:00:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Expression, columns",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Expression, columns",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80ec-8415-de7cf17b4901",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:01:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "equation",
                            "equation": {
                                "expression": "\\pi,\\rho "
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "\\pi,\\rho ",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80d0-9641-ec3a72b17d54",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:01:00.000Z",
                "last_edited_time": "2025-08-28T16:01:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "FROM",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "FROM",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8019-9da3-c8a5be486900",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:02:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "One or more tables",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "One or more tables",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-805f-bc26-c77197721e72",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:02:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "equation",
                            "equation": {
                                "expression": "\\bowtie_C "
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "\\bowtie_C ",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-809c-bb69-d7e5b3b55ad5",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:02:00.000Z",
                "last_edited_time": "2025-08-28T16:02:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "WHERE",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "WHERE",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80be-aa1f-c26d02598688",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:02:00.000Z",
                "last_edited_time": "2025-08-28T16:03:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Condition to return expected rows",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "Condition to return expected rows",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8068-a412-faecb3512186",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:03:00.000Z",
                "last_edited_time": "2025-08-28T16:03:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "equation",
                            "equation": {
                                "expression": "\\sigma "
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "\\sigma ",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8059-a82c-ebb67ec14a2f",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:03:00.000Z",
                "last_edited_time": "2025-08-28T16:04:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "GROUP BY, rows with same column values",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "GROUP BY, rows with same column values",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-806e-ae14-f1582794ef79",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:04:00.000Z",
                "last_edited_time": "2025-08-28T16:04:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "ORDER BY, column list",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "ORDER BY, column list",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8092-a9ff-d55fd8e3297f",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:04:00.000Z",
                "last_edited_time": "2025-08-28T16:05:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "4.2. Simple syntax",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "4.2. Simple syntax",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80e0-85b2-d4b8d4baea02",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:06:00.000Z",
                "last_edited_time": "2025-08-28T16:13:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": true,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "SELECT identifies what columns",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "SELECT identifies what columns",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-80d9-88a1-fb907bedc40a",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:13:00.000Z",
                "last_edited_time": "2025-08-28T16:13:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "FROM identifies which table ?",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "FROM identifies which table ?",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-8023-bdfc-ea3e9af2d55f",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:13:00.000Z",
                "last_edited_time": "2025-08-28T16:14:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "4.3. Tips writing & reading SQL queries",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "4.3. Tips writing & reading SQL queries",
                            "href": null
                        }
                    ],
                    "is_toggleable": false,
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-802a-983f-e36ab2abbef3",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:14:00.000Z",
                "last_edited_time": "2025-08-28T16:14:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "FROM - WHERE - SELECT",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "FROM - WHERE - SELECT",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "id": "25d7e2da-03a1-801a-baa3-f41b49a9c587",
                "parent": {
                    "type": "page_id",
                    "page_id": "25a7e2da-03a1-8030-8b2f-d0a48a5f100f"
                },
                "created_time": "2025-08-28T16:14:00.000Z",
                "last_edited_time": "2025-08-28T16:15:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "409cd534-86c4-418e-9d55-df6e2d0a483d"
                },
                "has_children": false,
                "archived": false,
                "in_trash": false,
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "First, FROM clause to know which relation involved in query",
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": "First, FROM clause to know which relation involved in query",
                            "href": null
                        }
                    ],
                    "color": "default"
                }
            }
        ],
        "next_cursor": "25d7e2da-03a1-801d-86ca-cb4ca23f5867",
        "has_more": true,
        "type": "block",
        "block": {},
        "request_id": "02fb124b-1898-49df-b79f-ffc6e5b1b67d"
    }

    const card = [
  {
    "question": "What are the objectives of learning SQL?",
    "answer": "Write simple queries, understand null values, use string and date-time data types, order output, and get an SQL overview."
  },
  {
    "question": "What does SQL stand for?",
    "answer": "Structured Query Language."
  },
  {
    "question": "Who developed the precursor SEQUEL and when?",
    "answer": "IBM in 1974."
  },
  {
    "question": "What are the advantages of SQL?",
    "answer": "Works with DBMS, easy to learn."
  },
  {
    "question": "How is SQL related to relational algebra?",
    "answer": "SQL is based on relational algebra but not identical."
  },
  {
    "question": "What are the mappings between relational algebra and SQL?",
    "answer": "Relations ↔ tables, Tuples ↔ rows, Attributes ↔ columns."
  },
  {
    "question": "What is a key difference between relations and tables?",
    "answer": "Tables allow duplicates (not sets), and row order is irrelevant."
  },
  {
    "question": "What are the three main sublanguages of SQL?",
    "answer": "DDL (Data Definition Language), DML (Data Manipulation Language), DCL (Data Control Language)."
  },
  {
    "question": "What do the CRUD operations stand for?",
    "answer": "Create, Read, Update, Delete."
  },
  {
    "question": "Give examples of DDL commands.",
    "answer": "CREATE DATABASE, CREATE TABLE, ALTER TABLE, RENAME TABLE, DROP TABLE, CREATE INDEX, DROP INDEX, CREATE VIEW."
  },
  {
    "question": "What are common SQL data types?",
    "answer": "CHAR(n), VARCHAR(n), INT, SMALLINT, NUMERIC(p,d), REAL, DOUBLE PRECISION, FLOAT(n), DATE, TIME, TIMESTAMP, BOOLEAN."
  },
  {
    "question": "How do you define a primary key with multiple attributes?",
    "answer": "Use PRIMARY KEY (attr1, attr2, ...)."
  },
  {
    "question": "What is a CHECK constraint?",
    "answer": "A condition that must be true for attribute values, e.g. CHECK (Age > 0)."
  },
  {
    "question": "How do you add a new column to an existing table?",
    "answer": "ALTER TABLE table_name ADD column_name datatype."
  },
  {
    "question": "How do you drop a column from a table?",
    "answer": "ALTER TABLE table_name DROP COLUMN column_name."
  },
  {
    "question": "What are referential integrity options in SQL?",
    "answer": "ON DELETE SET DEFAULT, ON UPDATE CASCADE."
  },
  {
    "question": "What are some SQL commands for metadata?",
    "answer": "SHOW DATABASES, SHOW TABLES, DESCRIBE table_name (MySQL only)."
  },
  {
    "question": "What does a SELECT statement do?",
    "answer": "Retrieves information from a database."
  },
  {
    "question": "What are the three main query operations in SQL?",
    "answer": "Projection (select columns), Selection (filter rows), Join (combine tables)."
  },
  {
    "question": "What is the general SQL query structure?",
    "answer": "SELECT columns FROM tables WHERE conditions GROUP BY columns ORDER BY columns."
  },
  {
    "question": "What is the recommended reading order of an SQL query?",
    "answer": "FROM → WHERE → SELECT."
  }
]

    const extractors: Record<string, (b: any) => string> = {
        // --- Headings ---
        heading_1: (b) => b.heading_1.rich_text.map((t: any) => t.plain_text).join(" "),
        heading_2: (b) => b.heading_2.rich_text.map((t: any) => t.plain_text).join(" "),
        heading_3: (b) => b.heading_3.rich_text.map((t: any) => t.plain_text).join(" "),

        // --- Text blocks ---
        paragraph: (b) => b.paragraph.rich_text.map((t: any) => t.plain_text).join(" "),
        quote: (b) => b.quote.rich_text.map((t: any) => t.plain_text).join(" "),
        callout: (b) => b.callout.rich_text.map((t: any) => t.plain_text).join(" "),

        // --- Lists ---
        bulleted_list_item: (b) => b.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join(" "),
        numbered_list_item: (b) => b.numbered_list_item.rich_text.map((t: any) => t.plain_text).join(" "),
        to_do: (b) => b.to_do.rich_text.map((t: any) => t.plain_text).join(" "),

        // --- Media ---
        image: (b) => b.image.type === "external" ? b.image.external.url : b.image.file.url,
        video: (b) => b.video.type === "external" ? b.video.external.url : b.video.file.url,
        file: (b) => b.file.type === "external" ? b.file.external.url : b.file.file.url,
        pdf: (b) => b.pdf.type === "external" ? b.pdf.external.url : b.pdf.file.url,
        audio: (b) => b.audio.type === "external" ? b.audio.external.url : b.audio.file.url,

        // --- Embeds & Links ---
        bookmark: (b) => b.bookmark.url,
        embed: (b) => b.embed.url,
        link_preview: (b) => b.link_preview.url,
        link_to_page: (b) => b.link_to_page.page_id ?? b.link_to_page.database_id,
        synced_block: (b) => b.synced_block.synced_from, // có thể fetch thêm children

        // --- Code / Math ---
        code: (b) => b.code.rich_text.map((t: any) => t.plain_text).join(" "),
        equation: (b) => b.equation.expression,

        // --- Divider / Table ---
        divider: () => "----",
        table_row: (b) => b.table_row.cells.map((cell: any[]) =>
            cell.map((t: any) => t.plain_text).join(" ")
        ).join(" | "),
        };

    // const [filter,setFilter] = useState<any[]>([])

    useEffect(() => {
        const values = data.results
            .filter(b => extractors[b.type])
            .map(b => extractors[b.type](b));
        console.log(values)
        // setFilter(values)
    },[])
    

  return (
    <div className='min-h-screen bg-white p-8'>
        <div className="max-w-4xl mx-auto">
        <Flashcard cards={card} />
      </div>
    </div>
  )
}

export default RetrieveNotion