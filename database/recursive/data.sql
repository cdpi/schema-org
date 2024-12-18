
PRAGMA foreign_keys = ON;

INSERT INTO `thing` VALUES (1, 'Thing');
INSERT INTO `thing` VALUES (2, 'Person');
INSERT INTO `thing` VALUES (3, 'CreativeWork');
INSERT INTO `thing` VALUES (4, 'Painting');
INSERT INTO `thing` VALUES (5, 'Photograph');
INSERT INTO `thing` VALUES (6, 'MediaObject');
INSERT INTO `thing` VALUES (7, 'AudioObject');
INSERT INTO `thing` VALUES (8, 'ImageObject');
INSERT INTO `thing` VALUES (9, 'VisualArtwork');
INSERT INTO `thing` VALUES (10, 'CoverArt');
INSERT INTO `thing` VALUES (11, 'Organization');
INSERT INTO `thing` VALUES (12, 'Place');
INSERT INTO `thing` VALUES (13, 'LocalBusiness');
INSERT INTO `thing` VALUES (14, 'FoodEstablishment');

INSERT INTO `hierarchy` VALUES (1, NULL);
INSERT INTO `hierarchy` VALUES (2, 1);
INSERT INTO `hierarchy` VALUES (3, 1);
INSERT INTO `hierarchy` VALUES (4, 3);
INSERT INTO `hierarchy` VALUES (5, 3);
INSERT INTO `hierarchy` VALUES (6, 3);
INSERT INTO `hierarchy` VALUES (7, 6);
INSERT INTO `hierarchy` VALUES (8, 6);
INSERT INTO `hierarchy` VALUES (9, 3);
INSERT INTO `hierarchy` VALUES (10, 9);
INSERT INTO `hierarchy` VALUES (11, 1);
INSERT INTO `hierarchy` VALUES (12, 1);

INSERT INTO `hierarchy` VALUES (13, 11); -- Thing > Organization > LocalBusiness
INSERT INTO `hierarchy` VALUES (13, 12); -- Thing > Place > LocalBusiness

INSERT INTO `hierarchy` VALUES (14, 13); -- Thing > Organization > LocalBusiness > FoodEstablishment
                                         -- Thing > Place > LocalBusiness > FoodEstablishment
