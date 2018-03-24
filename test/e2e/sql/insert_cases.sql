DELETE FROM case_event;
DELETE FROM case_data;

INSERT INTO case_data (id, case_type_id, jurisdiction, state, data)
VALUES (1, 'TestComplexAddressBookCase', 'PROBATE', 'CaseCreated',
        '{
          "PersonFirstName": "Janet",
          "PersonLastName": "Parker",
          "PersonAddress": {
            "AddressLine1": "123",
            "AddressLine2": "Fake Street",
            "AddressLine3": "Hexton",
            "Country": "England",
            "Postcode": "HX08 UTG"
          }
        }'
);

INSERT INTO case_data (id, case_type_id, jurisdiction, state, data)
VALUES (2, 'TestComplexAddressBookCase', 'PROBATE', 'some-state',
        '{
          "PersonFirstName": "George",
          "PersonLastName": "Roof",
          "PersonAddress": {
            "AddressLine1": "Flat 9",
            "AddressLine2": "2 Hubble Avenue",
            "AddressLine3": "ButtonVillie",
            "Country": "Wales",
            "Postcode": "WB11DDF"
          }
        }'
);

INSERT INTO case_data (id, case_type_id, jurisdiction, state, data)
VALUES (3, 'TestComplexAddressBookCase', 'PROBATE', 'CaseCreated',
        '{
          "PersonFirstName": "Peter",
          "PersonLastName": "Pullen",
          "PersonAddress": {
            "AddressLine1": "Governer House",
            "AddressLine2": "1 Puddle Lane",
            "AddressLine3": "London",
            "Country": "England",
            "Postcode": "SE1 4EE"
          }
        }'
);

INSERT INTO case_data (id, case_type_id, jurisdiction, state, data)
VALUES (4,'TestComplexAddressBookCase', 'PROBATE', 'Invalid',
        '{
          "PersonFirstName": "An",
          "PersonLastName": "Other",
          "PersonAddress": {
            "AddressLine1": "Some Street",
            "AddressLine2": "Some Town",
            "AddressLine3": "Some City",
            "Country": "Somewhere",
            "Postcode": "SE1 4EE"
          }
        }'
);

INSERT INTO case_event (
        case_data_id,
        case_type_id,
        case_type_version,
        description,
        summary,
        event_id,
        event_name,
        user_id,
        user_first_name,
        user_last_name,
        state,
        created_date,
        data
    ) VALUES (
        4,
        'TestComplexAddressBookCase',
        1,
        'Some comment',
        'The summary',
        'TEST_EVENT',
        'TEST EVENT NAME',
        0,
        'Justin',
        'Smith',
        'CaseCreated',
        '2017-05-09 14:31:43.000000',
        '{}'
    );



