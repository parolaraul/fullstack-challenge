## Document versioning

Detail how you would store several versioned novels.

Your approach should:

- [x] show the novel in its current state
- [x] show the novel at any point in its history
- [x] show the changes made between two versions
- [x] prioritize disk space efficiency
- [x] discuss any trade-offs made, as well as potential mitigations
- [x] consider any potential domain-specific issues

---
I would suggest adopting a version control system using Git. There are many alternatives; for example, I will assume we choose GitHub:

1. **Data Storage:**

    - Creating new repositories and pushing changes will ensure data storage. GitHub provides mechanisms for versioning, change tracking, and collaboration.
    - To accommodate scalability, let's assume we have a multi-user application, and each user may have more than one novel. Therefore, each individual user will have their own repository for novels in this system, and their novels will be contained within this repository.

2. **Representation of Novels:**

    - If a novel is represented by more than one file, we can store them in a containing folder. Otherwise, the novel could be represented as a plaintext file (e.g., in Markdown format).
    - We can store the novel in the root folder or use a time-based folder naming strategy within the repository. For example:
        - ./
            - 2023/
                - My_First_Novel.md

3. **Versioning:**

    - Each change to the novel will be treated as a commit in Git terminology.
    - Authors will make changes to the novel and commit them. Each commit will be accompanied by a commit message describing the changes made.

---

- [x] **Showing the Novel in its Current State:**

To display the novel in its current state, simply view the content of the latest commit (the "HEAD" of the Git repository).

- [x] **Showing the Novel at Any Point in its History:**

To view the novel at any point in its history, users can check out a specific commit by specifying its commit hash or tag. This allows them to see the content as it existed at that particular point in time.

- [x] **Showing the Changes Made Between Two Versions:**

Git provides built-in tools to display the differences between two commits (e.g., `git diff`). Users can select two commits to compare and view the changes between them.

- [x] **Disk Space Efficiency:**

Git uses an efficient storage mechanism called delta compression, storing only the changes made between commits, which saves disk space.

However, storing multiple versions of large novels can still consume considerable disk space over time. To address this, consider periodically compressing and archiving old versions or using Git's built-in mechanisms like "git gc" (garbage collection) to clean up unnecessary data.

- [x] **Trade-offs and Potential Mitigations:**

As Git may be a complex tool for authors and other systems to use, consider creating a simplified application that interacts with GitHub servers. This application would implement only the features within the scope of the novel versioning system, such as git commit, git log, and git diff.

The application may restrict each repository to be accessed by only one user, avoiding access control mechanisms or merge conflicts. Frequent commits can lead to a large number of small changes, potentially cluttering the history. To manage this, create a hook that controls the number of inserts, modifications, and deletions committed at a time.

By creating a proxy application to connect with GitHub, you establish a single point of contact with the data storage provider, making it more efficient to handle future changes to the API contract. This can improve new feature implementations and mitigate bugs.

- [x] **Domain-specific Issues:**

Since novels can have multiple contributors, implement a clear workflow for collaborative writing, including conflict resolution in case two authors edit the same portion simultaneously.

Ensure data integrity, as novels are valuable assets. Regularly back up the repository to prevent data loss.
