import React, { useEffect } from 'react'
import PostFormCard from '../components/PostFormCard'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../redux/post/postActions'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()

    const posts = useSelector((state) => state?.post?.posts?.posts)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <div className='px-96'>
            <PostFormCard />
            {
                posts?.length === 0 && (
                    <h1 className='text-center text-2xl mt-5'>No posts found</h1>
                )
            }
            <div className='mt-5'>
                {posts?.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}

            </div>
        </div>
    )
}

export default Home

