import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import './Posts.css';


class Posts extends Component {
    state = {
        posts: [],
        error: true
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        key: post.id,
                        author: 'Chitti'
                    }
                });

                this.setState({ posts: updatedPosts });
                //console.log(response)
            }
            ).catch(error => {
                this.setState({ error: false })
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/posts/' + id });
        //this.props.history.push('/' + id);
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}> Something Went Wrong! </p>;
        if (this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;