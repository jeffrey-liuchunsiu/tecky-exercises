SELECT file.user_id,
    COUNT(file.user_id)
FROM file
GROUP BY file.user_id;