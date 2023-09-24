import React, { useState } from 'react';
import { postViews } from '../redux/post/postActions';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/post/postActions';
const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleImageClick = () => {
        setIsExpanded(!isExpanded);
        dispatch(postViews(post._id));
        dispatch(getAllPosts());
    };

    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-2 flex justify-center border border-gray">
            <div className='p-2'>
                {post.media && (
                    <img
                        src={post.media}
                        alt={`Image for ${post.title}`}
                        className={`w-full h-40 rounded-lg ${isExpanded ? 'cursor-zoom-out' : 'cursor-pointer'}`}
                        onClick={handleImageClick}
                    />
                )}
            </div>
            <div className='h-100% border border-gray-200 '>

            </div>
            <div className={`px-6 py-4 ${isExpanded ? 'hidden' : 'block'}`}>
                <h2 className="text-xl font-semibold text-gray-800">title:{post.title}</h2>
                <p className="mt-2 text-gray-600">desc:{post.description}</p>
                <p className="mt-2 text-gray-600">Views:{post.views || 0}</p>
            </div>
        </div>
    );
}

export default PostCard;
