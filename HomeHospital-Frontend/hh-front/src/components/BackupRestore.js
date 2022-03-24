import React from "react";
import { Form, Button, Table } from "react-bootstrap";
import "../styles/admin.css";

function BackupRestore() {
  return (
    <>
      <div>
        <h2>BackupRestore</h2>
      </div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Backup Location</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Backup Interval</Form.Label>
            <Form.Select>
              <option defaultChecked value="24">
                Every 24 hours
              </option>
              <option value="12">Every 12 hours</option>
              <option value="1">Every hour</option>
            </Form.Select>
          </Form.Group>
          <Button className="create-btn">Create Backup</Button>
        </Form>
      </div>
      <div>
        <label>Last successful back up:</label> March 23, 22 11:23:09
        <span>
          <Button className="backup-btn">Backup now</Button>
        </span>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Backup file</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>patient-backup</td>
              <td>March 18, 2022 12:08:20</td>
              <td>/main/backups/patient-backup-2022-12-18.zip</td>
            </tr>
            <tr>
              <td>practitioner-backup</td>
              <td>March 19, 2022 12:08:20</td>
              <td>/main/backups/practitioner-backup-2022-12-19.zip</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <Form>
          <label>Retore from point</label>
          <Form.Select>
            <option>patient-backup</option>
            <option>practitioner-backup</option>
          </Form.Select>
          <Button className="restore-btn">Restore</Button>
        </Form>
      </div>
    </>
  );
}

export default BackupRestore;
