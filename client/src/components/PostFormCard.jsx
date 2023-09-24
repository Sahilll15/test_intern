import React, { useState } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { createPost, getAllPosts } from '../redux/post/postActions';
import { useDispatch } from 'react-redux';

export default function PostFormCard() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        media: null,
    });
    const [imageAddModel, setImageAddModel] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error('Enter title and description');
            return;
        }


        if (!formData.media) {
            toast.error('Select an image or video');
            return;
        }

        try {
            const { title, description, media } = formData;

            await dispatch(createPost({ title, description, media }));
            await dispatch(getAllPosts());
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'media') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <Card noPadding={false}>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="my-4">
                    <textarea
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border h-10 p-2 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Title..."
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="my-4">
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border h-10 p-2 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Description"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Image upload input */}
                {imageAddModel && (
                    <div className="mb-4">
                        <label htmlFor="media" className="block text-gray-700 font-bold mb-2">
                            Add a Photo / Video
                        </label>
                        <input
                            type="file"
                            id="media"
                            name="media"
                            accept="image/*, video/*"
                            onChange={handleInputChange}
                            className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}

                {/* Toggle image upload */}
                <div className="mb-4 flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer border-2 border-slate-200 hover:bg-gray-100"
                        onClick={() => setImageAddModel(!imageAddModel)}
                    >
                        <FontAwesomeIcon icon={faImage} className="text-gray-500 text-base" />
                        <span className="text-gray-700 text-lg ml-2">Attach Photo/Video &nbsp;</span>
                    </div>
                </div>

                <div className="text-right">
                    <button
                        className="group w-24 h-8 ml-2 relative z-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br flex items-center font-medium text-white transition-all duration-200 ease-in-out rounded-lg px-4 py-2 active:scale-95 active:shadow-inner"
                        type="submit"
                    >
                        <div className="absolute -z-10 -inset-0.5 rounded-xl blur-xl group-hover:opacity-100 animate-pulse group-hover:inset-10"></div>
                        <div className="svg-wrapper transform group-hover:translate-x-5 group-hover:rotate-45 transition-all duration-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className=""
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    fill="#fff"
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                            </svg>
                        </div>
                        <span className="ml-1 text-white transition-all duration-300 group-hover:text-transparent">
                            Post
                        </span>
                    </button>
                </div>
            </form>
        </Card>
    );
}
