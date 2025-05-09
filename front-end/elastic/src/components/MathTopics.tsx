import { Search } from 'lucide-react'

export const MathTopics = () => {
  return (
    <>
      <h2 className="math-topics__title">Trending Math Topics</h2>
      <div className="math-topics__card">
        <div className="math-topics__card-item">
          <div className="math-topics__card-item--header">
            <p>Treap</p>
            <Search className="math-topics__card-item--search" />
          </div>
          <div className="math-topics__card-item--text">
            <p>
              In computer science, the treap and the randomized binary search
              tree are two closely related forms of binary search tree data
              structures that maintain a dynamic set of ordered keys and
              allow binary searches among the keys. After any sequence of
              insertions and deletions of keys, the shape of the tree is a
              random variable with the same probability distribution as a random
              binary tree;
            </p>
          </div>
        </div>
        <div className="math-topics__card-item">
          <div className="math-topics__card-item--header">
            <p>Treap</p>
            <Search className="math-topics__card-item--search" />
          </div>
          <div className="math-topics__card-item--text">
            <p>
              In computer science, the treap and the randomized binary search
              tree are two closely related forms of binary search tree data
              structures that maintain a dynamic set of ordered keys and
              allow binary searches among the keys. After any sequence of
              insertions and deletions of keys, the shape of the tree is a
              random variable with the same probability distribution as a random
              binary tree;
            </p>
          </div>
        </div>
        <div className="math-topics__card-item">
          <div className="math-topics__card-item--header">
            <p>Treap</p>
            <Search className="math-topics__card-item--search" />
          </div>
          <div className="math-topics__card-item--text">
            <p>
              In computer science, the treap and the randomized binary search
              tree are two closely related forms of binary search tree data
              structures that maintain a dynamic set of ordered keys and allow
              binary searches among the keys. After any sequence of insertions
              and deletions of keys, the shape of the tree is a random variable
              with the same probability distribution as a random binary tree;
            </p>
          </div>
        </div>

        {/* TODO - Pagination component */}
      </div>
    </>
  )
}
