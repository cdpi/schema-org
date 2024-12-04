
CREATE TABLE company ( name, approver );

INSERT INTO company VALUES 
	( 'David', NULL ),
	( 'Matt', 'David' ), 
	( 'Jason', 'David' ),
	( 'Ryan', 'David' ),
	( 'Mike', 'Matt' ),
	( 'Carlos', 'Matt' ),
	( 'Garrett', 'Jason' ),
	( 'Puneet', 'Jason' ),
	( 'Joanie', 'Ryan' );

WITH RECURSIVE approvers(x) AS
	(
	SELECT
		'Joanie'
	UNION ALL
	SELECT
		company.approver
	FROM
		company, approvers
	WHERE
		company.name=approvers.x
	AND
		company.approver IS NOT NULL
	)
SELECT x FROM approvers;
