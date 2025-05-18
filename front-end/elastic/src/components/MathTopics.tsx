import { Search } from 'lucide-react'
import { Pagination } from './Pagination'
import { useState } from 'react'

export const MathTopics = () => {
  const [page, setPage] = useState(0)
  const size = 3
  const numPages = 3
  const firstIndex = page * size
  const lastIndex = (page + 1) * size
  const content = [
    {
      title: 'Treap1',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap2',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap3',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap4',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap5',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap6',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap7',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap8',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    },
    {
      title: 'Treap9',
      text: 'In computer science, the treap and the randomized binary search tree are two closely related forms of binary search tree data structures that maintain a dynamic set of ordered keys and allow binary searches among the keys. After any sequence of insertions and deletions of keys, the shape of the tree is a random variable with the same probability distribution as a random binary tree;'
    }
  ]

  return (
    <>
      <h2 className="math-topics__title">Trending Math Topics</h2>
      <div className="math-topics__card">
        <div className="math-topics__card-container">
          {content.slice(firstIndex, lastIndex).map(item => (
            <div className="math-topics__card-item">
              <div className="math-topics__card-item--header">
                <p>{item.title}</p>
                <Search className="math-topics__card-item--search" />
              </div>
              <div className="math-topics__card-item--text">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          page={page}
          changePage={(newPage: number) => setPage(newPage)}
          numPages={numPages}
          pageInfo={false}
        />
      </div>
    </>
  )
}
