SELECT file.user_id,
    COUNT(file.user_id)
FROM file
GROUP BY file.user_id;
select *
from file
where owner = 'alex';
SELECT owner,
    category,
    COUNT(owner)
FROM file
    Inner join category On file.category_id = category.id
where owner = 'alex'
    and category = 'Important'
GROUP BY owner,
    category;
SELECT owner,
    category,
    COUNT(owner)
FROM file
    Inner join category On file.category_id = category.id
GROUP BY owner,
    category;
SELECT file.user_id,
    COUNT(file.user_id)
FROM file
GROUP BY file.user_id
HAVING count(file.user_id) > 800;