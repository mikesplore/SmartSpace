# Git Quick Start Guide 🚀

This guide will help you get started with Git for this project.

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/1303liz/SmartSpace.git
   cd SmartSpace
   ```

2. **Configure Git (if you haven't already)**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Basic Git Commands

### Daily Workflow

1. **Check Status**
   ```bash
   git status  # Shows the status of your changes
   ```

2. **Pull Latest Changes**
   ```bash
   git pull origin main  # Get the latest changes from the main branch
   ```

3. **Stage Changes**
   ```bash
   git add .                    # Add all changes
   # OR
   git add specific-file.js     # Add specific file
   ```

4. **Commit Changes**
   ```bash
   git commit -m "Brief description of your changes"
   ```

5. **Push Changes**
   ```bash
   git push origin main
   ```

### Additional Useful Commands

- **View Changes**
  ```bash
  git diff  # Show unstaged changes
  ```

- **View Commit History**
  ```bash
  git log            # Full history
  git log --oneline  # Compact history
  ```

- **Discard Changes**
  ```bash
  git checkout -- file.js  # Discard changes in specific file
  git reset --hard        # Discard all changes (be careful!)
  ```

## Best Practices

1. **Commit Messages**
   - Keep them clear and concise
   - Start with a verb (Add, Update, Fix, Remove)
   - Example: "Add user authentication feature"

2. **Regular Pulls**
   - Always pull before starting new work
   - Pull before pushing your changes

3. **Code Review**
   - Review your changes before committing
   - Use `git diff` to check modifications

## Getting Help

- **Git Command Help**
  ```bash
  git help <command>
  git <command> --help
  ```

- **Common Issues**
  - If you get conflicts, don't panic! Reach out to the team
  - Always backup your work before trying new Git commands

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
