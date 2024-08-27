create table qna (
qna_id int auto_increment not null, 
productid int, 
userid int, 
qna_title varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL, 
qna_detail varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL, 
qna_answer varchar(400) COLLATE utf8mb4_unicode_ci,
qna_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
qna_finish varchar(20),

primary key (`qna_id`),
foreign key (`productid`) references product(`productid`),
foreign key (`userid`) references user(`userid`)
);

insert into qna values
( 
2, 
1, 
"167983", 
"비타민c는 따로 섭취해야 되나요?", 
"성분이 비타민 c는 없는것같은데 따로섭취하는게 좋나요? 그렇다면 mvpo와 비타민c 섭취시간은 간격을 두고 먹어야하나요?", 
"안녕하세요 고객님, 건강기능식품 대표브랜드 뉴트리원입니다.
뉴트리원을 찾아주셔서 감사합니다.
문의하신 MVPO 4in1은 미네랄, 비타민, 프로바이오틱스, 오메가3를 한 캡슐에 담아 간편하게 섭취가 가능한 올인원 영양제입니다. 
제품에 비타민C는 함유되어 있지 않아 보충이 필요하시다면 제품을 추가로 섭취하시는 것을 추천드립니다 :)
MVPO는 하루 1캡슐 아침 또는 점심 식후 섭취를 권장드리며, 비타민C 제품과는 함께 드셔도 무관합니다. 
더 궁금한 점이 있으시면 언제든지 문의를 남겨주세요.
감사합니다.",
'2024-03-21',
"true"
),
( 
1, 
1, 
"167983", 
"섭취시간", 
"하루 한 알 언제 섭취하는 게 좋은가요? 또한 식전과 식후 중 언제가 좋은가요?", 
"안녕하세요 고객님, 건강기능식품 대표브랜드 뉴트리원입니다. 뉴트리원을 찾아주셔서 감사합니다.
문의하신 MVPO 4in1은 미네랄, 비타민, 프로바이오틱스, 오메가3를 한 캡슐에 담아 간편하게 섭취가 가능한 올인원 영양제입니다. 
기초 건강 증진에 도움을 줄 수 있는 미네랄 4종과 영양 균형, 활력 증진을 위한 11종 비타민의 원활한 체내 흡수를 위해 하루 1캡슐을 아침 또는 점심 식후 섭취하시는 것을 권장드립니다 :)
MVPO는 프로바이오틱스, 오메가3를 포함한 성분들이 위산 등에 방해받지 않고 안전하게 장까지 도달할 수 있도록 장용성 코팅된 연질 캡슐 제품인 점 참고 부탁드립니다.
더 궁금한 점이 있으시면 언제든지 문의를 남겨주세요. 감사합니다.",
'2024-03-21',
"true"
)



