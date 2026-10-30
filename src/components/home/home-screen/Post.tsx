'use client';
import { CreatorPostCard } from 'components-front-end/creator/components/CreatorPostCard';
import { Button } from 'components-front-end/creator/ui/button';
import { Input } from 'components-front-end/creator/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from 'components-front-end/creator/ui/dialog';
import { useToast } from 'components-front-end/creator/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CldVideoPlayer } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Creator, FeedPost } from '@/lib/types';
import { commentOnPostAction, deletePostAction, likePostAction } from './actions';
import Comment from './Comment';
export default function Post({ post, isSubscribed, admin, currentUserId }: { post: FeedPost; isSubscribed: boolean; admin: Creator; currentUserId: string }) {
  const [comment, setComment] = useState('');
  const { toast } = useToast();
  const client = useQueryClient();
  const onError = (error: Error) => toast({ title: 'Unable to complete the action', description: error.message, variant: 'destructive' });
  const refresh = () => { client.invalidateQueries({ queryKey: ['posts'] }); };
  const like = useMutation({ mutationFn: () => likePostAction(post.id), onSuccess: refresh, onError });
  const remove = useMutation({ mutationFn: () => deletePostAction(post.id), onSuccess: refresh, onError });
  const addComment = useMutation({ mutationFn: () => commentOnPostAction(post.id, comment), onSuccess: () => { setComment(''); refresh(); }, onError });
  const media = post.mediaUrl && (post.mediaType === 'video' ? <CldVideoPlayer width={960} height={540} src={post.mediaUrl} /> : <div className="relative w-full aspect-video"><Image src={post.mediaUrl} alt="Post from the farm" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover rounded-lg" /></div>);
  return <CreatorPostCard creator={admin} date={new Date(post.createdAt).toLocaleDateString('en-US')} text={post.text} locked={!post.isPublic && !isSubscribed} media={media}
    membershipAction={<Button asChild><Link href="/pricing">Subscribe to unlock</Link></Button>}
    adminAction={admin.id === currentUserId && <Button variant="ghost" disabled={remove.isPending} onClick={() => { if (window.confirm('Delete this post and its comments?')) remove.mutate(); }}>Delete</Button>}
    actions={<>
      <Button variant="ghost" aria-pressed={post.likesList.length > 0} disabled={!isSubscribed || like.isPending} onClick={() => like.mutate()}>♡ {post.likes} likes</Button>
      <Dialog><DialogTrigger asChild><Button variant="ghost" disabled={!isSubscribed}>Comments ({post.comments.length})</Button></DialogTrigger><DialogContent><DialogTitle>Comments</DialogTitle><DialogDescription>Join the conversation with other members.</DialogDescription><div className="max-h-80 overflow-y-auto">{post.comments.length ? post.comments.map(item => <Comment key={item.id} comment={item} />) : <p>No comments yet.</p>}</div><form className="space-y-3" onSubmit={event => { event.preventDefault(); addComment.mutate(); }}><label className="sr-only" htmlFor={`comment-${post.id}`}>Your comment</label><Input id={`comment-${post.id}`} value={comment} onChange={event => setComment(event.target.value)} maxLength={1000} required /><Button type="submit" disabled={addComment.isPending}>{addComment.isPending ? 'Sending…' : 'Comment'}</Button></form></DialogContent></Dialog>
    </>} />;
}
