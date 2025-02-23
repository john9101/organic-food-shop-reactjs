import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {ArrowUturnLeftIcon, UserIcon} from "@heroicons/react/24/outline"
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverTrigger} from "@/components/ui/popover.tsx";
import {PopoverContent} from "@radix-ui/react-popover";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useForm} from "react-hook-form";
import {ReplyCommentRequest} from "@/type/request/comment.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import { replyCommentSchema} from "@/schema/comment.schema.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {replyComment, resetRepliedComment} from "@/redux/slice/comment.slice.ts";
import {useEffect, useState} from "react";

type CommentProps = {
    isReplied?: boolean;
    id: number
    content: string;
    commentatorName: string,
    createdAt: Date,
    isDeleted: boolean
}

const Comment = ({isReplied, content, commentatorName, createdAt, isDeleted, id}: CommentProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const {comment} = useAppSelector(state => state.comment)
    const repliedComment = comment.replied

    const replyCommentForm = useForm<ReplyCommentRequest>({
        resolver: yupResolver(replyCommentSchema)
    })


    useEffect(() => {
        if (repliedComment) {
            replyCommentForm.reset({content: ""})
            dispatch(resetRepliedComment())
            setOpen(false)
        }
    },[repliedComment])

    const onSubmitReplyCommentForm = (body: ReplyCommentRequest)=> {
        const promise = dispatch(replyComment({repliedId: id, body: body}))
        return () => promise.abort()
    }

    return (
        <div className="flex">
            <div>
                <Avatar className="h-8 w-8">
                    <AvatarFallback><UserIcon className="h-4 w-4"/></AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-md sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                    <span
                        className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    >
                        {commentatorName}
                    </span>
                    <span className="mx-2">·</span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">{createdAt.toString()}</span>
                </div>
                <span className={`block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 text-sm dark:text-neutral-300 ${isDeleted && "text-red-600 line-through"}`}>
                    {!isDeleted ? content : "Bình luận đã bị xóa"}
                </span>
                {
                    !isDeleted && isReplied && <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button className="text-neutral-900 border-none bg-neutral-100 hover:bg-green-50  hover:text-green-600 focus:outline-none">
                                    <ArrowUturnLeftIcon key={id}/> Phản hồi
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="mt-6 mb-2 w-96 z-10 bg-white border border-input rounded-md p-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Phản hồi bình luận</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Nhập nội dung phản hồi
                                        </p>
                                    </div>

                                    <Form {...replyCommentForm}>
                                        <form onSubmit={replyCommentForm.handleSubmit(onSubmitReplyCommentForm)} className="grid gap-4">
                                            <FormField
                                                control={replyCommentForm.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Textarea {...field} cols={6}/>
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-600"/>
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex">
                                                <div className="flex-1"></div>
                                                <Button type="submit" className="bg-green-600 hover:bg-green-500">Gửi</Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                }
            </div>
        </div>
    )
}

export default Comment